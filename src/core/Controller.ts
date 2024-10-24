import { Scene } from '@babylonjs/core';
import VirtualScroll, { VirtualScrollEvent } from 'virtual-scroll';
import SceneManager from '../graphics/SceneManager';
import { hasPointingDevice, hasTouchscreen } from '../settings/general';
import { maxFrame } from '../settings/keyframes';

interface DeviceOrientation {
  alpha: number;
  beta: number;
  gamma: number;
}

export default class Controller {
  private frame = 0;

  private maxFrame = maxFrame;

  private moveSpeed = 0.015; // Number of frames advanced by 1px scroll input.

  private moveForward = true;

  private turnFrames = 10; // Number of frames to complete turn.

  private turnRate = 0; // 0 to 1

  private turnEnabled = false;

  private usePointerInput = false;

  private useOrientationInput = false;

  private maxDeviceRotation = 60; // degrees

  private baseDeviceOrientation: DeviceOrientation | null = null;

  private deviceOrientation: DeviceOrientation | null = null;

  private routeOffset = 0;

  private routeInvert = false;

  private splashScreenEnabled = true;

  private loadingProgress = 0;

  private startScreenEnabled = false;

  private startScreenProgress = 0;

  private sceneManager: SceneManager;

  private emitter: EventTarget;

  private virtualScroll: VirtualScroll | null = null;

  private pointermoveListener: (event: PointerEvent) => void;

  private deviceOrientationListener: (event: DeviceOrientationEvent) => void;

  private orientationChangeListener: (event: Event) => void;

  public constructor(scene: Scene) {
    this.usePointerInput = hasPointingDevice;
    this.useOrientationInput =
      !this.usePointerInput && !!window.DeviceOrientationEvent;
    this.pointermoveListener = this.handlePointermove.bind(this);
    this.deviceOrientationListener = this.handleDeviceOrientation.bind(this);
    this.orientationChangeListener = this.handleOrientationChange.bind(this);

    // Prepare for custom events.
    this.emitter = new EventTarget();

    // Set up 3D scene.
    this.sceneManager = new SceneManager(scene);

    // Load glTF and textures.
    this.sceneManager.loadAssets();

    // Update loading progress.
    this.sceneManager.onAssetsLoaded((remaining, total) => {
      // Add +1 for final rendering task.
      this.loadingProgress = 1 - (remaining + 1) / (total + 1);
      this.emitter.dispatchEvent(new CustomEvent('loadingProgress'));
    });

    // Attach input events after assets loaded.
    this.sceneManager.onReady(() => {
      this.virtualScroll = new VirtualScroll({ touchMultiplier: 3 });
      this.virtualScroll.on(this.handleScroll.bind(this));

      if (this.usePointerInput) {
        window.addEventListener('pointermove', this.pointermoveListener);
      }
      if (this.useOrientationInput) {
        window.addEventListener(
          'deviceorientation',
          this.deviceOrientationListener,
        );
        window.screen.orientation.addEventListener(
          'change',
          this.orientationChangeListener,
        );
      }

      // Hide splash screen and show start screen.
      // Slightly delay it to prevent frame drop due to the initial rendering.
      setTimeout(() => {
        this.loadingProgress = 1;
        this.splashScreenEnabled = false;
        this.startScreenEnabled = true;
        this.emitter.dispatchEvent(new CustomEvent('loadingProgress'));
        this.emitter.dispatchEvent(new CustomEvent('splashScreenToggle'));
        this.emitter.dispatchEvent(new CustomEvent('startScreenToggle'));
      }, 1000);
    });
  }

  public onSplashScreenToggle(callback: (enabled: boolean) => void) {
    this.emitter.addEventListener('splashScreenToggle', () => {
      callback(this.splashScreenEnabled);
    });
  }

  public onLoadingProgress(callback: (progress: number) => void) {
    this.emitter.addEventListener('loadingProgress', () => {
      callback(this.loadingProgress);
    });
  }

  public onStartScreenToggle(callback: (enabled: boolean) => void) {
    this.emitter.addEventListener('startScreenToggle', () => {
      callback(this.startScreenEnabled);
    });
  }

  public onStartScreenProgress(callback: (progress: number) => void) {
    this.emitter.addEventListener('startScreenProgress', () => {
      callback(this.startScreenProgress);
    });
  }

  public destroy() {
    if (this.virtualScroll) {
      this.virtualScroll.destroy();
    }
    if (this.usePointerInput) {
      window.removeEventListener('pointermove', this.pointermoveListener);
    }
    if (this.useOrientationInput) {
      window.removeEventListener(
        'deviceorientation',
        this.deviceOrientationListener,
      );
      window.screen.orientation.removeEventListener(
        'change',
        this.orientationChangeListener,
      );
    }
    // TODO: Remove custom event listeners.
    // if (this.emitter) {
    // }
  }

  private inputMove(value: number) {
    let frameIncrement = value;

    // Handle turn movement.
    const reversalInput =
      (this.moveForward && frameIncrement < 0) ||
      (!this.moveForward && frameIncrement > 0);
    if (this.turnEnabled && (this.turnRate > 0 || reversalInput)) {
      const turnRateIncrement = reversalInput
        ? Math.abs(frameIncrement) / this.turnFrames
        : -Math.abs(frameIncrement) / this.turnFrames;
      let newTurnRate = this.turnRate + turnRateIncrement;
      if (newTurnRate > 1) {
        // Complete turn.
        this.moveForward = !this.moveForward;
        this.sceneManager.applyDirection(
          this.moveForward ? 'forward' : 'backward',
        );
        const surplusTurnRate = newTurnRate - 1;
        frameIncrement = this.moveForward
          ? surplusTurnRate * this.turnFrames
          : -surplusTurnRate * this.turnFrames;
        newTurnRate = 0;
      } else if (newTurnRate < 0) {
        // Cancel turn.
        const surplusTurnRate = -newTurnRate;
        frameIncrement = this.moveForward
          ? surplusTurnRate * this.turnFrames
          : -surplusTurnRate * this.turnFrames;
        newTurnRate = 0;
      } else {
        // Don't update frame during turn.
        frameIncrement = 0;
      }
      this.turnRate = newTurnRate;
      this.sceneManager.applyTurnRate(this.turnRate);
    }

    // Handle frame update.
    if (frameIncrement !== 0) {
      const newFrame = this.frame + frameIncrement;
      if (newFrame < 0) {
        // If player exceeds the start point, restart a route in the opposite direction.
        this.routeInvert = !this.routeInvert;
        this.moveForward = true;
        this.turnRate = 0;
        this.frame = -newFrame;
        this.sceneManager.applyRoute(this.routeOffset, this.routeInvert);
        this.sceneManager.applyDirection('forward');
        this.sceneManager.applyTurnRate(this.turnRate);
        this.sceneManager.applyFrame(this.frame);
      } else if (newFrame > this.maxFrame) {
        // If player exceeds the end point, decrement the offset and restart a route in the opposite direction.
        this.routeOffset -= 1;
        this.routeInvert = !this.routeInvert;
        this.moveForward = true;
        this.turnRate = 0;
        this.frame = newFrame - this.maxFrame;
        this.sceneManager.applyRoute(this.routeOffset, this.routeInvert);
        this.sceneManager.applyDirection('forward');
        this.sceneManager.applyTurnRate(this.turnRate);
        this.sceneManager.applyFrame(this.frame);
      } else {
        // Otherwise, just update the frame number.
        this.frame = newFrame;
        this.sceneManager.applyFrame(this.frame);
      }
    }
  }

  private inputRotation(x: number, y: number) {
    this.sceneManager.applyRotation(x, y); // Each value ranges from -1 to 1.
  }

  private resetOrientation() {
    this.baseDeviceOrientation = this.deviceOrientation
      ? { ...this.deviceOrientation }
      : null;
  }

  private handleScroll(event: VirtualScrollEvent) {
    if (this.splashScreenEnabled) {
      // Do nothing during the splash screen.
    } else if (this.startScreenEnabled) {
      const scrollMultiplier = hasTouchscreen ? 2 : 1;
      const nextStartScreenProgress =
        this.startScreenProgress -
        event.deltaY / (window.innerHeight * scrollMultiplier);
      if (nextStartScreenProgress < 0) {
        // Stop at the initial position.
        this.startScreenProgress = 0;
        this.emitter.dispatchEvent(new CustomEvent('startScreenProgress'));
      } else if (nextStartScreenProgress > 1) {
        // Hide the start screen and start playable mode.
        this.startScreenProgress = 1;
        this.startScreenEnabled = false;
        this.emitter.dispatchEvent(new CustomEvent('startScreenProgress'));
        this.emitter.dispatchEvent(new CustomEvent('startScreenToggle'));
        this.turnEnabled = true;
      } else {
        // Play animations during the start screen.
        this.startScreenProgress = nextStartScreenProgress;
        this.emitter.dispatchEvent(new CustomEvent('startScreenProgress'));
        const frameIncrement =
          event.deltaY * this.moveSpeed * -nextStartScreenProgress; // From 0 to 100% speed
        // TODO: This may cause unexpected progress when user scrolls up and down during the start screen.
        this.inputMove(frameIncrement);
      }
    } else {
      // On even offset floors (0, -2, -4, ...), scroll bottom (negative deltaY) to move forward.
      const evenOffset = this.routeOffset % 2 === 0;
      let multiplier = evenOffset ? -1 : 1;
      // In invert route, reverse the direction.
      multiplier = this.routeInvert ? -multiplier : multiplier;
      const frameIncrement = event.deltaY * this.moveSpeed * multiplier;
      this.inputMove(frameIncrement);
    }
  }

  private handlePointermove(event: PointerEvent) {
    const { innerWidth, innerHeight } = window;
    if (innerWidth > 0 && innerHeight > 0) {
      const xInput = (event.clientX - innerWidth / 2) / (innerWidth / 2);
      const yInput = (event.clientY - innerHeight / 2) / (innerHeight / 2);
      this.inputRotation(xInput, yInput);
    }
  }

  private handleDeviceOrientation(event: DeviceOrientationEvent) {
    const { alpha, beta, gamma } = event;
    if (alpha !== null && beta !== null && gamma !== null) {
      if (!this.baseDeviceOrientation) {
        this.baseDeviceOrientation = { alpha, beta, gamma };
      }
      this.deviceOrientation = { alpha, beta, gamma };

      let betaInput: number;
      const betaRotation =
        this.deviceOrientation.beta - this.baseDeviceOrientation.beta;
      if (betaRotation < -this.maxDeviceRotation) {
        betaInput = -1;
      } else if (betaRotation > this.maxDeviceRotation) {
        betaInput = 1;
      } else {
        betaInput = betaRotation / this.maxDeviceRotation;
      }

      let gammaInput: number;
      const gammaRotation =
        this.deviceOrientation.gamma - this.baseDeviceOrientation.gamma;
      if (gammaRotation < -this.maxDeviceRotation) {
        gammaInput = 1;
      } else if (gammaRotation > this.maxDeviceRotation) {
        gammaInput = -1;
      } else {
        gammaInput = -gammaRotation / this.maxDeviceRotation;
      }

      let xInput: number;
      let yInput: number;
      switch (window.screen.orientation.type) {
        case 'portrait-primary':
          xInput = gammaInput;
          yInput = -betaInput;
          break;
        case 'portrait-secondary':
          xInput = -gammaInput;
          yInput = betaInput;
          break;
        case 'landscape-primary':
          xInput = -betaInput;
          yInput = -gammaInput;
          break;
        case 'landscape-secondary':
          xInput = betaInput;
          yInput = gammaInput;
          break;
        default:
          xInput = gammaInput;
          yInput = -betaInput;
      }
      this.inputRotation(xInput, yInput);
    }
  }

  private handleOrientationChange() {
    this.resetOrientation();
  }
}
