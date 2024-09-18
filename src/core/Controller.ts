import { Scene } from '@babylonjs/core';
import VirtualScroll, { VirtualScrollEvent } from 'virtual-scroll';
import SceneManager from '../graphics/SceneManager';
import { hasPointingDevice } from '../settings/general';
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

  private usePointerInput = false;

  private useOrientationInput = false;

  private maxDeviceRotation = 60; // degrees

  private baseDeviceOrientation: DeviceOrientation | null = null;

  private deviceOrientation: DeviceOrientation | null = null;

  private sceneManager: SceneManager;

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

    // Set up 3D scene.
    this.sceneManager = new SceneManager(scene);

    // Attach input events after assets loaded.
    this.sceneManager.loadAssets(() => {
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
  }

  private inputMove(value: number) {
    let frameIncrement = value;

    // Handle turn movement.
    const reversalInput =
      (this.moveForward && frameIncrement < 0) ||
      (!this.moveForward && frameIncrement > 0);
    if (this.turnRate > 0 || reversalInput) {
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

    // Update frame number.
    if (frameIncrement !== 0) {
      let newFrame = this.frame + frameIncrement;
      if (newFrame < 0) newFrame = 0;
      if (newFrame > this.maxFrame) newFrame = this.maxFrame;
      this.frame = newFrame;
      this.sceneManager.applyFrame(this.frame);
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
    const frame = -event.deltaY * this.moveSpeed; // Scroll bottom to move forward.
    this.inputMove(frame); // Scroll bottom to move forward.
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
