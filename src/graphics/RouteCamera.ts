import { Curve3, Path3D, Scene, TargetCamera, Vector3 } from '@babylonjs/core';
import { keyframes, Keyframes, maxFrame } from '../settings/keyframes';
import { floorHeight } from '../settings/meshes';

export default class RouteCamera extends TargetCamera {
  public frame = 0;

  public forward = true;

  public turnRate = 0; // 0 to 1

  public inputX = 0; // -1 to 1

  public inputY = 0; // -1 to 1

  private keyframes: Keyframes = [];

  private maxFrame = maxFrame;

  private minFov = 55 * (Math.PI / 180); // FOV for 16/9 landscape mode.

  private maxFov = 81 * (Math.PI / 180); // FOV for 9/16 portrait mode.

  private baseDirection = new Vector3(0, 0, 1);

  private positionPath!: Path3D;

  private forwardRotationOffsetPath!: Path3D;

  private backwardRotationOffsetPath!: Path3D;

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
    this.maxZ = 15;
    this.keyframes = keyframes;

    // Define route data with Path3D object.
    this.updateRoute(0, false);

    // Register event for each rendering frame.
    this.getScene().registerBeforeRender(() => this.updateCamera());
  }

  public updateRoute(offset = 0, invert = false) {
    // Create Path3D object from spline curve with keyframe points.
    const keyPositionPoints = this.keyframes.map(
      (keyframe) =>
        new Vector3(
          invert ? -keyframe.position.x : keyframe.position.x,
          keyframe.position.y + offset * floorHeight,
          invert ? -keyframe.position.z : keyframe.position.z,
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
  }

  private getProgress(frame: number) {
    if (this.maxFrame === 0) {
      return 0;
    }
    return frame / this.maxFrame; // 0 to 1
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
    const progress = this.getProgress(this.frame);
    const targetPosition = this.positionPath.getPointAt(progress);
    return targetPosition;
  }

  private getBaseRotation(frame: number, forward: boolean) {
    // Calculate camera Y rotation from tangent vector.
    const progress = this.getProgress(frame);
    const tangent = this.positionPath.getTangentAt(progress);
    let rotationY = Math.acos(
      Vector3.Dot(
        this.baseDirection,
        new Vector3(tangent.x, 0, tangent.z).normalize(),
      ),
    );
    if (tangent.x < 0) {
      rotationY = Math.PI * 2 - rotationY;
    }

    // Turn back when moving backward.
    if (!forward) {
      rotationY += Math.PI;
    }

    // Adjust rotation based on offset settings.
    // Memo: .getPointAt(progress) doesn't return expected value.
    const pointIndex = Math.floor(frame);
    const rotationOffset =
      (forward
        ? this.forwardRotationOffsetPath?.getPoints()[pointIndex]
        : this.backwardRotationOffsetPath?.getPoints()[pointIndex]) ||
      new Vector3(0, 0, 0);

    const baseRotation = new Vector3(0, rotationY, 0).add(rotationOffset);
    return baseRotation;
  }

  private getTargetRotation() {
    const baseRotation = this.getBaseRotation(this.frame, this.forward);
    let targetRotation: Vector3;

    // Calculate turning.
    if (this.turnRate !== 0) {
      // Turn in the opposite direction to the previous movement.
      let previousFrame = this.forward ? this.frame - 1 : this.frame + 1;
      if (previousFrame < 0) {
        previousFrame = 0;
      } else if (previousFrame > this.maxFrame) {
        previousFrame = this.maxFrame;
      }
      const previousBaseRotation = this.getBaseRotation(
        previousFrame,
        this.forward,
      );
      // If rotating negatively in the previous frame, turn in the positive direction.
      const turnPositive = baseRotation.y < previousBaseRotation.y;
      const nextBaseRotation = this.getBaseRotation(this.frame, !this.forward);
      if (turnPositive && nextBaseRotation.y - baseRotation.y < 0) {
        nextBaseRotation.y += 2 * Math.PI;
      } else if (!turnPositive && nextBaseRotation.y - baseRotation.y > 0) {
        nextBaseRotation.y -= 2 * Math.PI;
      }
      targetRotation = Vector3.Lerp(
        baseRotation,
        nextBaseRotation,
        this.turnRate,
      );
    } else {
      targetRotation = baseRotation.clone();
    }

    // Adjust rotation direction by 360 degrees to avoid jumping.
    while (Math.abs(targetRotation.y - this.rotation.y) > Math.PI) {
      const correction =
        targetRotation.y > this.rotation.y ? -2 * Math.PI : 2 * Math.PI;
      targetRotation.y += correction;
    }

    return targetRotation;
  }
}
