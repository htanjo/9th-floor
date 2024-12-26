import { getCloneName, getOriginalName } from './areas';
import { toRadians } from './general';

export interface Keyframe {
  position: { x: number; y: number; z: number };
  forwardRotationOffset: { x: number; y: number; z: number };
  backwardRotationOffset: { x: number; y: number; z: number };
  areaName: string;
}

export type Keyframes = Keyframe[];

const keyframeSegments = 10;

// Number of frames advanced by 1px scroll input.
export const moveSpeed = 0.015;

// Number of frames from when the title disappears to when the start screen ends.
export const startScreenAdditionalFrames = 100;

export const keyframes: Keyframes = [
  {
    position: { x: 0, y: 5.1, z: 0 },
    forwardRotationOffset: { x: 0, y: toRadians(-5), z: 0 },
    backwardRotationOffset: { x: 0, y: toRadians(-5), z: 0 },
    areaName: getOriginalName('hallway'),
  },
  {
    position: { x: -0.2, y: 5.1, z: -3.2 },
    forwardRotationOffset: { x: 0, y: 0, z: 0 },
    backwardRotationOffset: { x: 0, y: 0, z: 0 },
    areaName: getOriginalName('hallway'),
  },
  {
    position: { x: 1.1, y: 5.1, z: -4 },
    forwardRotationOffset: { x: toRadians(-5), y: toRadians(-8), z: 0 },
    backwardRotationOffset: { x: 0, y: 0, z: 0 },
    areaName: 'upper_floor',
  },
  {
    position: { x: 3.5, y: 5.1, z: -4 },
    forwardRotationOffset: { x: toRadians(-10), y: toRadians(-3), z: 0 },
    backwardRotationOffset: { x: toRadians(15), y: 0, z: 0 },
    areaName: 'upper_floor',
  },
  {
    position: { x: 4, y: 5.1, z: -4.8 },
    forwardRotationOffset: { x: 0, y: toRadians(20), z: 0 },
    backwardRotationOffset: { x: toRadians(-10), y: toRadians(30), z: 0 },
    areaName: 'upper_floor',
  },
  {
    position: { x: 3.2, y: 5.1, z: -7 },
    forwardRotationOffset: { x: toRadians(-5), y: toRadians(-60), z: 0 },
    backwardRotationOffset: { x: toRadians(-5), y: toRadians(15), z: 0 },
    areaName: 'upper_floor',
  },
  {
    position: { x: 3.4, y: 5.1, z: -9.5 },
    forwardRotationOffset: { x: toRadians(0), y: toRadians(-40), z: 0 },
    backwardRotationOffset: { x: 0, y: toRadians(5), z: 0 },
    areaName: 'upper_floor',
  },
  {
    position: { x: 4.3, y: 5.1, z: -12 },
    forwardRotationOffset: { x: toRadians(10), y: toRadians(50), z: 0 },
    backwardRotationOffset: { x: 0, y: toRadians(-55), z: 0 },
    areaName: 'stairs',
  },
  {
    position: { x: 4.5, y: 4.5, z: -14.1 },
    forwardRotationOffset: { x: toRadians(45), y: toRadians(15), z: 0 },
    backwardRotationOffset: { x: toRadians(5), y: toRadians(20), z: 0 },
    areaName: 'stairs',
  },
  {
    position: { x: 4.4, y: 3.3, z: -16.5 },
    forwardRotationOffset: { x: toRadians(30), y: toRadians(-10), z: 0 },
    backwardRotationOffset: { x: toRadians(25), y: 0, z: 0 },
    areaName: 'stairs',
  },
  {
    position: { x: 3.8, y: 3.3, z: -17.3 },
    forwardRotationOffset: { x: toRadians(25), y: toRadians(-10), z: 0 },
    backwardRotationOffset: { x: toRadians(-30), y: toRadians(15), z: 0 },
    areaName: 'stairs',
  },
  {
    position: { x: 3, y: 3.3, z: -17.2 },
    forwardRotationOffset: { x: toRadians(-5), y: toRadians(-5), z: 0 },
    backwardRotationOffset: { x: toRadians(10), y: 0, z: 0 },
    areaName: 'stairs',
  },
  {
    position: { x: 2.3, y: 3.3, z: -16.5 },
    forwardRotationOffset: { x: toRadians(48), y: toRadians(10), z: 0 },
    backwardRotationOffset: { x: toRadians(15), y: toRadians(5), z: 0 },
    areaName: 'stairs',
  },
  {
    position: { x: 2.0, y: 2.1, z: -14.1 },
    forwardRotationOffset: { x: toRadians(10), y: toRadians(30), z: 0 },
    backwardRotationOffset: { x: toRadians(-5), y: toRadians(-40), z: 0 },
    areaName: 'stairs',
  },
  {
    position: { x: 2.5, y: 1.5, z: -12 },
    forwardRotationOffset: { x: toRadians(15), y: toRadians(-55), z: 0 },
    backwardRotationOffset: { x: toRadians(25), y: 0, z: 0 },
    areaName: 'lower_floor',
  },
  {
    position: { x: 3.6, y: 1.5, z: -9.5 },
    forwardRotationOffset: { x: 0, y: toRadians(-60), z: 0 },
    backwardRotationOffset: { x: toRadians(-5), y: toRadians(30), z: 0 },
    areaName: 'lower_floor',
  },
  {
    position: { x: 3.3, y: 1.5, z: -7 },
    forwardRotationOffset: { x: toRadians(-5), y: toRadians(-20), z: 0 },
    backwardRotationOffset: { x: 0, y: toRadians(-30), z: 0 },
    areaName: 'lower_floor',
  },
  {
    position: { x: 3.6, y: 1.5, z: -4.7 },
    forwardRotationOffset: { x: toRadians(8), y: toRadians(35), z: 0 },
    backwardRotationOffset: { x: toRadians(15), y: toRadians(40), z: 0 },
    areaName: 'lower_floor',
  },
  {
    position: { x: 2.8, y: 1.5, z: -3.8 },
    forwardRotationOffset: { x: toRadians(10), y: toRadians(20), z: 0 },
    backwardRotationOffset: { x: 0, y: toRadians(-20), z: 0 },
    areaName: 'lower_floor',
  },
  {
    position: { x: 1.1, y: 1.5, z: -4 },
    forwardRotationOffset: { x: 0, y: 0, z: 0 },
    backwardRotationOffset: { x: 0, y: toRadians(-10), z: 0 },
    areaName: getCloneName('hallway'),
  },
  {
    position: { x: -0.2, y: 1.5, z: -3.2 },
    forwardRotationOffset: { x: 0, y: 0, z: 0 },
    backwardRotationOffset: { x: 0, y: 0, z: 0 },
    areaName: getCloneName('hallway'),
  },
  {
    position: { x: 0, y: 1.5, z: 0 },
    forwardRotationOffset: { x: 0, y: toRadians(-5), z: 0 },
    backwardRotationOffset: { x: 0, y: toRadians(-5), z: 0 },
    areaName: getCloneName('hallway'),
  },
];

export const maxFrame = (keyframes.length - 1) * keyframeSegments;
