import { Scene } from '@babylonjs/core/scene';
import i18n from 'i18next';
import VirtualScroll, { VirtualScrollEvent } from 'virtual-scroll';
import SceneManager from '../graphics/SceneManager';
import { hasPointingDevice, hasTouchscreen } from '../settings/general';
import {
  keyframes as keyframesSetting,
  maxFrame as maxFrameSetting,
  moveSpeed as moveSpeedSetting,
} from '../settings/keyframes';
import {
  getBaseName,
  getCloneName,
  getOriginalName,
  getSuffix,
} from '../settings/areas';
import {
  anomalyConfigs,
  anomalyIncidenceRate,
  maxAnomalyCount,
  maxNoAnomalyCount,
  resolvedAnomalyRate,
} from '../settings/anomalies';

interface DeviceOrientation {
  alpha: number;
  beta: number;
  gamma: number;
}

export default class Controller {
  public frame = 0;

  private keyframes = keyframesSetting;

  private maxFrame = maxFrameSetting;

  private moveSpeed = moveSpeedSetting; // Number of frames advanced by 1px scroll input.

  public moveForward = true;

  private touchMultiplier = 3;

  private turnFrames = 10; // Number of frames to complete turn.

  public turnRate = 0; // 0 to 1

  private turnEnabled = false;

  private usePointerInput = false;

  private useOrientationInput = false;

  private maxDeviceRotation = 60; // degrees

  private baseDeviceOrientation: DeviceOrientation | null = null;

  private deviceOrientation: DeviceOrientation | null = null;

  public routeOffset = 0;

  public routeInvert = false;

  public areaName = keyframesSetting[0].areaName;

  public minFloorNumber = 1;

  public maxFloorNumber = 9;

  public floorNumber = this.maxFloorNumber;

  private loadingScreenEnabled = true;

  private loadingProgress = 0;

  private startScreenEnabled = false;

  private startScreenProgress = 0; // 0 to 1

  private startScreenScroll = 0; // pixels

  private startScreenLength = 1200; // pixels

  private resolvedAnomalyNames: string[] = [];

  public anomalyCount = 0;

  public noAnomalyCount = 0;

  public anomalyName: string | null = null;

  public roomEntered = false;

  public sceneManager: SceneManager;

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
      this.virtualScroll = new VirtualScroll({
        touchMultiplier: this.touchMultiplier,
      });
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

      // Support multi-language.
      this.sceneManager.applyLanguage(i18n.language);
      i18n.on('languageChanged', (language) => {
        this.sceneManager.applyLanguage(language);
      });

      // Don't set area to render and cache all meshes at beginning.
      // this.sceneManager.applyArea(this.areaName);

      // Don't cause any anomalies on the first 9th floor.
      this.sceneManager.applyFloor(this.floorNumber);
      this.anomalyName = null;
      this.sceneManager.applyAnomaly(this.anomalyName);

      // Hide loading screen and show start screen.
      // Slightly delay it to prevent frame drop due to the initial rendering.
      setTimeout(() => {
        this.loadingProgress = 1;
        this.loadingScreenEnabled = false;
        this.startScreenEnabled = true;
        this.emitter.dispatchEvent(new CustomEvent('loadingProgress'));
        this.emitter.dispatchEvent(new CustomEvent('loadingScreenToggle'));
        this.emitter.dispatchEvent(new CustomEvent('startScreenToggle'));
      }, 1000);
    });
  }

  public onLoadingScreenToggle(callback: (enabled: boolean) => void) {
    this.emitter.addEventListener('loadingScreenToggle', () => {
      callback(this.loadingScreenEnabled);
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

  public onStartScreenProgress(
    callback: (progress: number, scroll: number) => void,
  ) {
    this.emitter.addEventListener('startScreenProgress', () => {
      callback(this.startScreenProgress, this.startScreenScroll);
    });
  }

  public onFrameProgress(
    callback: (frame: number, maxFrame: number, moveSpeed: number) => void,
  ) {
    this.emitter.addEventListener('frameProgress', () => {
      callback(this.frame, this.maxFrame, this.moveSpeed);
    });
  }

  public onHorizontalScroll(callback: () => void) {
    this.emitter.addEventListener('horizontalScroll', () => {
      callback();
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

  private drawAnomaly() {
    const selectAnomaly = (rejectsResolvedAnomaly?: boolean) => {
      const anomalyValue = Math.random();
      const anomalyIndex = Math.floor(anomalyConfigs.length * anomalyValue);
      const newAnomalyName = anomalyConfigs[anomalyIndex].name;
      // If the anomaly is the same as previous, select again.
      if (newAnomalyName === this.anomalyName) {
        return selectAnomaly();
      }
      // If the anomaly is already resolved, select again depending on the probability.
      if (
        this.resolvedAnomalyNames.length < anomalyConfigs.length &&
        this.resolvedAnomalyNames.includes(newAnomalyName) &&
        (rejectsResolvedAnomaly || !(Math.random() < resolvedAnomalyRate))
      ) {
        return selectAnomaly(true);
      }
      return newAnomalyName;
    };
    const incidenceValue = Math.random();
    if (
      (incidenceValue < anomalyIncidenceRate ||
        this.noAnomalyCount >= maxNoAnomalyCount) &&
      this.anomalyCount < maxAnomalyCount
    ) {
      const anomalyName = selectAnomaly();
      return anomalyName;
    }
    return null;
  }

  private checkAnswer(hasAnomaly: boolean) {
    const correctAnswer = this.anomalyName !== null;
    return hasAnomaly === correctAnswer;
  }

  private inputMove(value: number) {
    let frameIncrement = value;

    // Determine the current area.
    const currentAreaName = this.getCurrentAreaName();
    if (
      this.areaName === getOriginalName('hallway') &&
      getBaseName(currentAreaName) === 'upper_floor'
    ) {
      this.roomEntered = true;
    }
    this.areaName = currentAreaName;
    this.sceneManager.applyArea(this.areaName);

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
      const exceedsStartLine = newFrame < 0;
      const exceedsFinishLine = newFrame > this.maxFrame;
      // If player exceeds the start or finish line, perform additional tasks.
      if (exceedsStartLine || exceedsFinishLine) {
        // After the finish line, decrement the position offset.
        if (exceedsFinishLine) {
          this.routeOffset -= 1;
        }
        // Restart a route in the opposite direction;
        this.routeInvert = !this.routeInvert;
        this.moveForward = true;
        this.turnRate = 0;
        this.frame = exceedsStartLine ? -newFrame : newFrame - this.maxFrame; // Set the excess.
        this.emitter.dispatchEvent(new CustomEvent('frameProgress'));
        this.sceneManager.applyRoute(this.routeOffset, this.routeInvert);
        this.sceneManager.applyDirection('forward');
        this.sceneManager.applyTurnRate(this.turnRate);
        this.sceneManager.applyFrame(this.frame);
        // Check the answer only if player has already entered the room.
        if (this.roomEntered) {
          const answer = exceedsStartLine; // True means hasAnomaly.
          this.roomEntered = false;
          const passed = this.checkAnswer(answer);
          if (passed) {
            if (this.anomalyName !== null) {
              this.resolvedAnomalyNames.push(this.anomalyName);
            }
            this.floorNumber -= 1;
            if (this.floorNumber < this.minFloorNumber) {
              // eslint-disable-next-line no-alert
              alert(i18n.t('Congratulations! You have escaped!'));
              // Loop floors until creating game ending.
              this.floorNumber = this.maxFloorNumber;
            }
          } else {
            this.resolvedAnomalyNames = [];
            // Back to the start floor.
            this.floorNumber = this.maxFloorNumber;
          }
          if (this.anomalyName === null) {
            this.anomalyCount = 0;
            this.noAnomalyCount += 1;
          } else {
            this.anomalyCount += 1;
            this.noAnomalyCount = 0;
          }
          this.sceneManager.applyFloor(this.floorNumber);
          // Draw a new anomaly.
          this.anomalyName = this.drawAnomaly();
          this.sceneManager.applyAnomaly(this.anomalyName);
        }
      } else {
        // Otherwise, just update the frame number.
        this.frame = newFrame;
        this.emitter.dispatchEvent(new CustomEvent('frameProgress'));
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
    // Do nothing during the loading screen.
    if (this.loadingScreenEnabled) {
      return;
    }
    if (this.startScreenEnabled) {
      // In the start screen, update progress and scroll value.
      const scrollLength = -event.deltaY;
      const scrollMultiplier = hasTouchscreen ? this.touchMultiplier : 1;
      this.startScreenScroll += scrollLength / scrollMultiplier;
      if (this.startScreenScroll < 0) {
        this.startScreenScroll = 0;
      }
      this.startScreenProgress += scrollLength / this.startScreenLength;
      if (this.startScreenProgress < 0) {
        // Stop at the initial position.
        this.startScreenProgress = 0;
        this.emitter.dispatchEvent(new CustomEvent('startScreenProgress'));
      } else if (this.startScreenProgress > 1) {
        // Hide the start screen and start playable mode.
        this.startScreenProgress = 1;
        this.startScreenEnabled = false;
        this.emitter.dispatchEvent(new CustomEvent('startScreenProgress'));
        this.emitter.dispatchEvent(new CustomEvent('startScreenToggle'));
        this.turnEnabled = true;
      } else {
        // Play animations during the start screen.
        this.emitter.dispatchEvent(new CustomEvent('startScreenProgress'));
        const frameIncrement =
          scrollLength * this.moveSpeed * this.startScreenProgress; // From 0 to 100% speed according to the progress.
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
    // Show the warning message if user scrolls horizontally.
    if (
      Math.abs(event.deltaX) > Math.abs(event.deltaY) * 2 &&
      Math.abs(event.deltaX) > 20
    ) {
      this.emitter.dispatchEvent(new CustomEvent('horizontalScroll'));
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

  private getCurrentAreaName() {
    const { frame, keyframes, maxFrame, routeInvert } = this;
    const currentKeyframeIndex = Math.floor(
      (frame / maxFrame) * (keyframes.length - 1),
    );
    const { areaName } = keyframes[currentKeyframeIndex];
    const hasSuffix = !!getSuffix(areaName);
    if (hasSuffix) {
      return areaName;
    }
    return routeInvert ? getCloneName(areaName) : getOriginalName(areaName);
  }
}
