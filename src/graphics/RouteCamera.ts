import {
  Curve3,
  Nullable,
  Path3D,
  Scene,
  TargetCamera,
  Vector3,
} from '@babylonjs/core';
import { keyframes, Keyframes, maxFrame } from '../settings/keyframes';

export default class RouteCamera extends TargetCamera {
  public frame = 0;

  public forward = true;

  public inputX = 0; // -1 to 1

  public inputY = 0; // -1 to 1

  private keyframes: Keyframes = [];

  private maxFrame = maxFrame;

  private get progress(): number {
    if (this.maxFrame === 0) {
      return 0;
    }
    return this.frame / this.maxFrame; // 0 to 1
  }

  private minFov = 55 * (Math.PI / 180); // FOV for 16/9 landscape mode.

  private maxFov = 81 * (Math.PI / 180); // FOV for 9/16 portrait mode.

  private baseDirection = new Vector3(0, 0, 1);

  private positionPath: Nullable<Path3D> = null;

  private forwardRotationOffsetPath: Nullable<Path3D> = null;

  private backwardRotationOffsetPath: Nullable<Path3D> = null;

  public constructor(name: string, scene?: Scene) {
    const initialFrame = keyframes[0];
    const initialPosition = new Vector3(
      initialFrame.position.x,
      initialFrame.position.y,
      initialFrame.position.z,
    );

    super(name, initialPosition, scene);

    this.rotation = new Vector3(0, Math.PI, 0);
    this.fov = this.minFov;
    this.minZ = 0.01;
    this.keyframes = keyframes;

    // Create Path3D object from spline curve with keyframe points.
    const keyPositionPoints = this.keyframes.map(
      (keyframe) =>
        new Vector3(
          keyframe.position.x,
          keyframe.position.y,
          keyframe.position.z,
        ),
    );
    const positionCurve = Curve3.CreateCatmullRomSpline(
      keyPositionPoints,
      10,
      false,
    );
    this.positionPath = new Path3D(positionCurve.getPoints());

    const keyForwardRotationOffsetPoints = this.keyframes.map(
      (keyframe) =>
        new Vector3(
          keyframe.forwardRotationOffset.x,
          keyframe.forwardRotationOffset.y,
          keyframe.forwardRotationOffset.z,
        ),
    );
    const forwardRotationOffsetCurve = Curve3.CreateCatmullRomSpline(
      keyForwardRotationOffsetPoints,
      10,
      false,
    );
    this.forwardRotationOffsetPath = new Path3D(
      forwardRotationOffsetCurve.getPoints(),
    );

    const keyBackwardRotationOffsetPoints = this.keyframes.map(
      (keyframe) =>
        new Vector3(
          keyframe.backwardRotationOffset.x,
          keyframe.backwardRotationOffset.y,
          keyframe.backwardRotationOffset.z,
        ),
    );
    const backwardRotationOffsetCurve = Curve3.CreateCatmullRomSpline(
      keyBackwardRotationOffsetPoints,
      10,
      false,
    );
    this.backwardRotationOffsetPath = new Path3D(
      backwardRotationOffsetCurve.getPoints(),
    );

    this.getScene().registerBeforeRender(() => this.updateCamera());
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

    // Turn back when moving backward.
    if (!this.forward) {
      targetRotation.y += Math.PI;
    }

    // Adjust rotation based on user input.
    targetRotation.x += this.inputY * (Math.PI * 0.1);
    targetRotation.y += this.inputX * (Math.PI * 0.2);

    // Update camera state with tween animation.
    const deltaTime = this.getEngine().getDeltaTime();
    let positionLerpAmount = deltaTime / 250;
    let rotationLerpAmount = deltaTime / 200;
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

  private getTargetPosition() {
    if (!this.positionPath) {
      return this.position;
    }
    const targetPosition = this.positionPath.getPointAt(this.progress);
    return targetPosition;
  }

  private getTargetRotation() {
    if (!this.positionPath) {
      return this.rotation;
    }

    // Calculate camera Y rotation from tangent vector.
    const targetDirection = this.positionPath.getTangentAt(this.progress);
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

    // Adjust rotation based on offset settings.
    // TODO: .getPointAt(this.progress) doesn't return expected value.
    const rotationOffset =
      (this.forward
        ? this.forwardRotationOffsetPath?.getPoints()[Math.floor(this.frame)]
        : this.backwardRotationOffsetPath?.getPoints()[
            Math.floor(this.frame)
          ]) || new Vector3(0, 0, 0);

    const targetRotation = new Vector3(0, rotationY, 0).add(rotationOffset);
    return targetRotation;
  }
}
