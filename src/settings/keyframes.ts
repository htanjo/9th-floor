export interface Keyframe {
  position: { x: number; y: number; z: number };
  forwardRotationOffset: { x: number; y: number; z: number };
  backwardRotationOffset: { x: number; y: number; z: number };
}

export type Keyframes = Keyframe[];

function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

const keyframeSegments = 10;

export const keyframes: Keyframes = [
  {
    position: { x: -3.4, y: 5.1, z: 3.5 },
    forwardRotationOffset: { x: 0, y: 0, z: 0 },
    backwardRotationOffset: { x: 0, y: 0, z: 0 },
  },
  {
    position: { x: -3.4, y: 5.1, z: 1.4 },
    forwardRotationOffset: { x: 0, y: 0, z: 0 },
    backwardRotationOffset: { x: 0, y: 0, z: 0 },
  },
  {
    position: { x: -3.6, y: 5.1, z: -1.2 },
    forwardRotationOffset: { x: 0, y: 0, z: 0 },
    backwardRotationOffset: { x: 0, y: 0, z: 0 },
  },
  {
    position: { x: -2.3, y: 5.1, z: -2 },
    forwardRotationOffset: { x: toRadians(-5), y: 0, z: 0 },
    backwardRotationOffset: { x: 0, y: 0, z: 0 },
  },
  {
    position: { x: -0.1, y: 5.1, z: -2 },
    forwardRotationOffset: { x: toRadians(-10), y: 0, z: 0 },
    backwardRotationOffset: { x: 0, y: 0, z: 0 },
  },
  {
    position: { x: 0.6, y: 5.1, z: -2.8 },
    forwardRotationOffset: { x: 0, y: toRadians(5), z: 0 },
    backwardRotationOffset: { x: toRadians(-10), y: toRadians(30), z: 0 },
  },
  {
    position: { x: 0, y: 5.1, z: -5 },
    forwardRotationOffset: { x: toRadians(-10), y: toRadians(-40), z: 0 },
    backwardRotationOffset: { x: toRadians(-5), y: toRadians(15), z: 0 },
  },
  {
    position: { x: 0.2, y: 5.1, z: -7.5 },
    forwardRotationOffset: { x: toRadians(-7), y: toRadians(-10), z: 0 },
    backwardRotationOffset: { x: 0, y: toRadians(5), z: 0 },
  },
  {
    position: { x: 1, y: 5.1, z: -10 },
    forwardRotationOffset: { x: toRadians(2), y: toRadians(10), z: 0 },
    backwardRotationOffset: { x: 0, y: toRadians(-20), z: 0 },
  },
  {
    position: { x: 1.2, y: 4.5, z: -12 },
    forwardRotationOffset: { x: toRadians(35), y: toRadians(3), z: 0 },
    backwardRotationOffset: { x: toRadians(5), y: toRadians(-8), z: 0 },
  },
  {
    position: { x: 1, y: 3.3, z: -14.5 },
    forwardRotationOffset: { x: toRadians(30), y: toRadians(3), z: 0 },
    backwardRotationOffset: { x: toRadians(25), y: 0, z: 0 },
  },
  {
    position: { x: 0.4, y: 3.3, z: -15.2 },
    forwardRotationOffset: { x: toRadians(-10), y: toRadians(10), z: 0 },
    backwardRotationOffset: { x: toRadians(-14), y: toRadians(10), z: 0 },
  },
  {
    position: { x: -0.4, y: 3.3, z: -15.2 },
    forwardRotationOffset: { x: toRadians(-5), y: toRadians(-5), z: 0 },
    backwardRotationOffset: { x: toRadians(-16), y: 0, z: 0 },
  },
  {
    position: { x: -1, y: 3.3, z: -14.5 },
    forwardRotationOffset: { x: toRadians(45), y: 0, z: 0 },
    backwardRotationOffset: { x: toRadians(10), y: toRadians(-7), z: 0 },
  },
  {
    position: { x: -1.1, y: 2.1, z: -12 },
    forwardRotationOffset: { x: toRadians(25), y: 0, z: 0 },
    backwardRotationOffset: { x: toRadians(25), y: 0, z: 0 },
  },
  {
    position: { x: -0.9, y: 1.5, z: -10 },
    forwardRotationOffset: { x: 0, y: 0, z: 0 },
    backwardRotationOffset: { x: toRadians(10), y: 0, z: 0 },
  },
  {
    position: { x: 0, y: 1.5, z: -7.5 },
    forwardRotationOffset: { x: 0, y: 0, z: 0 },
    backwardRotationOffset: { x: toRadians(-5), y: toRadians(30), z: 0 },
  },
  {
    position: { x: -0.2, y: 1.5, z: -5 },
    forwardRotationOffset: { x: 0, y: 0, z: 0 },
    backwardRotationOffset: { x: toRadians(5), y: toRadians(8), z: 0 },
  },
  {
    position: { x: 0.1, y: 1.5, z: -2.6 },
    forwardRotationOffset: { x: 0, y: toRadians(20), z: 0 },
    backwardRotationOffset: { x: toRadians(15), y: toRadians(18), z: 0 },
  },
  {
    position: { x: -0.6, y: 1.5, z: -1.8 },
    forwardRotationOffset: { x: 0, y: toRadians(15), z: 0 },
    backwardRotationOffset: { x: 0, y: 0, z: 0 },
  },
  {
    position: { x: -2.3, y: 1.5, z: -2 },
    forwardRotationOffset: { x: 0, y: 0, z: 0 },
    backwardRotationOffset: { x: 0, y: toRadians(-10), z: 0 },
  },
];

export const maxFrame = (keyframes.length - 1) * keyframeSegments;
