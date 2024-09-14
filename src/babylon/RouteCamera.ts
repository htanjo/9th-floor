import {
  Curve3,
  Nullable,
  Path3D,
  Scene,
  TargetCamera,
  Vector2,
  Vector3,
} from '@babylonjs/core';
import { Keyframes } from '../settings/keyframes';
import { hasPointingDevice } from '../settings/config';

interface DeviceOrientation {
  alpha: number;
  beta: number;
  gamma: number;
}

export default class RouteCamera extends TargetCamera {
  public frame = 0;

  public keyframes: Keyframes = [];

  public forward = true;

  public get maxFrame(): number {
    if (this.keyframes.length <= 1) {
      return this.keyframes.length;
    }
    return (this.keyframes.length - 1) * 10;
  }

  public get progress(): number {
    if (this.maxFrame === 0) {
      return 0;
    }
    return this.frame / this.maxFrame; // 0 to 1
  }

  private minFov = 55 * (Math.PI / 180); // FOV for 16/9 landscape mode.

  private maxFov = 81 * (Math.PI / 180); // FOV for 9/16 portrait mode.

  private usePointerInput = false;

  private useOrientationInput = false;

  private baseDeviceOrientation: Nullable<DeviceOrientation> = null;

  private deviceOrientation: Nullable<DeviceOrientation> = null;

  private rotationLimit = 60; // degrees

  private path: Nullable<Path3D> = null;

  private baseDirection = new Vector3(0, 0, 1);

  private handleDeviceOrientationBound: (event: DeviceOrientationEvent) => void;

  private handleOrientationChangeBound: (event: Event) => void;

  public constructor(
    name: string,
    keyframes: Keyframes,
    position: Vector3,
    scene?: Scene,
    setActiveOnSceneIfNoneActive?: boolean,
  ) {
    super(name, position, scene, setActiveOnSceneIfNoneActive);

    this.keyframes = keyframes;
    this.fov = this.minFov;
    this.minZ = 0.01;
    this.usePointerInput = hasPointingDevice;
    this.useOrientationInput =
      !this.usePointerInput && !!window.DeviceOrientationEvent;

    // Create Path3D object from spline curve with keyframe points.
    const keyframePoints = this.keyframes.map(
      (keyframe) =>
        new Vector3(
          keyframe.position.x,
          keyframe.position.y,
          keyframe.position.z,
        ),
    );
    const curve = Curve3.CreateCatmullRomSpline(keyframePoints, 10, false);
    const points = curve.getPoints();
    this.path = new Path3D(points);

    this.handleDeviceOrientationBound = this.handleDeviceOrientation.bind(this);
    this.handleOrientationChangeBound = this.handleOrientationChange.bind(this);

    this.getScene().registerBeforeRender(() => this.updateCamera());

    if (this.useOrientationInput) {
      window.addEventListener(
        'deviceorientation',
        this.handleDeviceOrientationBound,
      );
      window.screen.orientation.addEventListener(
        'change',
        this.handleOrientationChangeBound,
      );
    }
  }

  public resetOrientation() {
    this.baseDeviceOrientation = this.deviceOrientation
      ? { ...this.deviceOrientation }
      : null;
  }

  public detachEvents() {
    if (this.useOrientationInput) {
      window.removeEventListener(
        'deviceorientation',
        this.handleDeviceOrientationBound,
      );
      window.screen.orientation.removeEventListener(
        'change',
        this.handleOrientationChangeBound,
      );
    }
  }

  private handleDeviceOrientation(event: DeviceOrientationEvent) {
    const { alpha, beta, gamma } = event;
    if (alpha !== null && beta !== null && gamma !== null) {
      if (!this.baseDeviceOrientation) {
        this.baseDeviceOrientation = { alpha, beta, gamma };
      }
      this.deviceOrientation = { alpha, beta, gamma };
    }
  }

  private handleOrientationChange() {
    this.resetOrientation();
  }

  private updateFov() {
    const canvas = this.getEngine().getRenderingCanvas();
    if (canvas) {
      const aspectRatio = canvas.width / canvas.height;
      const minAspectRatio = 9 / 16;
      const maxAspectRatio = 16 / 9;
      if (aspectRatio < minAspectRatio) {
        this.fov = this.maxFov;
      } else if (aspectRatio > maxAspectRatio) {
        this.fov = this.minFov;
      } else {
        const fovExtensionRatio =
          (maxAspectRatio - aspectRatio) / (maxAspectRatio - minAspectRatio);
        this.fov =
          this.minFov + (this.maxFov - this.minFov) * fovExtensionRatio;
      }
    }
  }

  private updateCamera() {
    const targetPosition = this.getTargetPosition();
    const targetRotation = this.getTargetRotation();

    // Change rotation when moving backward.
    if (!this.forward) {
      targetRotation.x *= 0.4; // Look down a little when climbing stairs.
      targetRotation.y += Math.PI; // Turn back.
    }

    let input = new Vector2(0, 0);
    if (this.usePointerInput) {
      input = this.getPointerInput();
    } else if (this.useOrientationInput) {
      input = this.getOrientationInput();
    }
    targetRotation.x += input.y * (Math.PI * 0.1);
    targetRotation.y += input.x * (Math.PI * 0.2);

    // Update camera state with tween animation.
    const deltaTime = this.getEngine().getDeltaTime();
    let positionLerpAmount = this.useOrientationInput
      ? deltaTime / 200
      : deltaTime / 250;
    let rotationLerpAmount = this.useOrientationInput
      ? deltaTime / 150
      : deltaTime / 200;
    if (positionLerpAmount > 1) {
      positionLerpAmount = 1;
    }
    if (rotationLerpAmount > 1) {
      rotationLerpAmount = 1;
    }
    this.position = Vector3.Lerp(
      this.position,
      targetPosition,
      positionLerpAmount,
    );
    this.rotation = Vector3.Lerp(
      this.rotation,
      targetRotation,
      rotationLerpAmount,
    );
    this.updateFov();
  }

  // Get input from pointing device. (-1 to 1)
  private getPointerInput(): Vector2 {
    const canvas = this.getEngine().getRenderingCanvas();
    if (!canvas) {
      return new Vector2(0, 0);
    }
    const scene = this.getScene();
    const x = (scene.pointerX - canvas.width / 2) / (canvas.width / 2);
    const y = (scene.pointerY - canvas.height / 2) / (canvas.height / 2);
    return Vector2.Clamp(
      new Vector2(x, y),
      new Vector2(-1, -1),
      new Vector2(1, 1),
    );
  }

  // Get input from device orientation. (-1 to 1)
  private getOrientationInput(): Vector2 {
    const { baseDeviceOrientation, deviceOrientation, rotationLimit } = this;
    if (!baseDeviceOrientation || !deviceOrientation) {
      return new Vector2(0, 0);
    }

    let betaInput: number;
    const betaRotation = deviceOrientation.beta - baseDeviceOrientation.beta;
    if (betaRotation < -rotationLimit) {
      betaInput = -1;
    } else if (betaRotation > rotationLimit) {
      betaInput = 1;
    } else {
      betaInput = betaRotation / rotationLimit;
    }

    let gammaInput: number;
    const gammaRotation = deviceOrientation.gamma - baseDeviceOrientation.gamma;
    if (gammaRotation < -rotationLimit) {
      gammaInput = 1;
    } else if (gammaRotation > rotationLimit) {
      gammaInput = -1;
    } else {
      gammaInput = -gammaRotation / rotationLimit;
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
    return new Vector2(xInput, yInput);
  }

  private getTargetPosition() {
    if (!this.path) {
      return this.position;
    }
    const targetPosition = this.path.getPointAt(this.progress);
    return targetPosition;
  }

  private getTargetRotation() {
    if (!this.path) {
      return this.rotation;
    }

    // Calculate camera Y rotation from tangent vector.
    const targetDirection = this.path.getTangentAt(this.progress);
    let rotationY = Math.acos(
      Vector3.Dot(
        this.baseDirection,
        new Vector3(targetDirection.x, 0, targetDirection.z).normalize(),
      ),
    );
    if (targetDirection.x < 0) {
      rotationY = Math.PI * 2 - rotationY;
    }

    // Prevent camera from rotating +- 360 degrees.
    const currentRotationY = this.forward
      ? this.rotation.y
      : this.rotation.y - Math.PI;
    while (Math.abs(rotationY - currentRotationY) > Math.PI) {
      const correction =
        rotationY > currentRotationY ? -2 * Math.PI : 2 * Math.PI;
      rotationY += correction;
    }

    return new Vector3(0, rotationY, 0);
  }
}
