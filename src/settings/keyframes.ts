export interface Keyframe {
  position: { x: number; y: number; z: number };
  forwardRotationOffset: { x: number; y: number; z: number };
  backwardRotationOffset: { x: number; y: number; z: number };
}

export type Keyframes = Keyframe[];

function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

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
    forwardRotationOffset: { x: toRadians(-5), y: toRadians(-10), z: 0 },
    backwardRotationOffset: { x: 0, y: toRadians(5), z: 0 },
  },
  {
    position: { x: 1, y: 5.1, z: -10 },
    forwardRotationOffset: { x: toRadians(5), y: toRadians(10), z: 0 },
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
    forwardRotationOffset: { x: toRadians(-12), y: toRadians(10), z: 0 },
    backwardRotationOffset: { x: toRadians(-14), y: toRadians(10), z: 0 },
  },
  {
    position: { x: -0.4, y: 3.3, z: -15.2 },
    forwardRotationOffset: { x: toRadians(10), y: toRadians(-5), z: 0 },
    backwardRotationOffset: { x: toRadians(-16), y: 0, z: 0 },
  },
  {
    position: { x: -1, y: 3.3, z: -14.5 },
    forwardRotationOffset: { x: toRadians(50), y: 0, z: 0 },
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
    backwardRotationOffset: { x: 0, y: 0, z: 0 },
  },
  {
    position: { x: 0, y: 1.5, z: -7.5 },
    forwardRotationOffset: { x: 0, y: 0, z: 0 },
    backwardRotationOffset: { x: 0, y: 0, z: 0 },
  },
  {
    position: { x: -0.2, y: 1.5, z: -5 },
    forwardRotationOffset: { x: 0, y: 0, z: 0 },
    backwardRotationOffset: { x: toRadians(10), y: toRadians(10), z: 0 },
  },
  {
    position: { x: 0.1, y: 1.5, z: -2.6 },
    forwardRotationOffset: { x: 0, y: toRadians(20), z: 0 },
    backwardRotationOffset: { x: toRadians(15), y: toRadians(15), z: 0 },
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

// export const keyframes: Keyframes = [
//   {
//     frame: 0,
//     camera: {
//       position: { x: -3.4, y: 5.1, z: 2 },
//       rotation: { x: 0, y: 180 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 4,
//     camera: {
//       position: { x: -3.4, y: 5.1, z: -2 },
//       rotation: { x: 0, y: 180 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 7,
//     camera: {
//       position: { x: -3.4, y: 5.1, z: -2 },
//       rotation: { x: 0, y: 90 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 10,
//     camera: {
//       position: { x: 0, y: 5.1, z: -2 },
//       rotation: { x: 0, y: 90 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 13,
//     camera: {
//       position: { x: 0, y: 5.1, z: -2 },
//       rotation: { x: 0, y: 180 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 18,
//     camera: {
//       position: { x: 0, y: 5.1, z: -7 },
//       rotation: { x: 0, y: 180 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 19,
//     camera: {
//       position: { x: 0, y: 5.1, z: -8 },
//       rotation: { x: 0, y: 160 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 21,
//     camera: {
//       position: { x: 1, y: 5.1, z: -10 },
//       rotation: { x: 0, y: 160 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 22,
//     camera: {
//       position: { x: 1, y: 5.1, z: -11 },
//       rotation: { x: 30 * (Math.PI / 180), y: 180 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 25,
//     camera: {
//       position: { x: 1, y: 3.3, z: -14 },
//       rotation: { x: 30 * (Math.PI / 180), y: 180 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 26,
//     camera: {
//       position: { x: 1, y: 3.3, z: -15 },
//       rotation: { x: 0, y: 180 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 29,
//     camera: {
//       position: { x: 1, y: 3.3, z: -15 },
//       rotation: { x: 0, y: 270 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 31,
//     camera: {
//       position: { x: -1, y: 3.3, z: -15 },
//       rotation: { x: 0, y: 270 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 34,
//     camera: {
//       position: { x: -1, y: 3.3, z: -15 },
//       rotation: { x: 0, y: 360 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 35,
//     camera: {
//       position: { x: -1, y: 3.3, z: -14 },
//       rotation: { x: 30 * (Math.PI / 180), y: 360 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 38,
//     camera: {
//       position: { x: -1, y: 1.5, z: -11 },
//       rotation: { x: 30 * (Math.PI / 180), y: 360 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 39,
//     camera: {
//       position: { x: -1, y: 1.5, z: -10 },
//       rotation: { x: 0, y: 380 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 41,
//     camera: {
//       position: { x: 0, y: 1.5, z: -8 },
//       rotation: { x: 0, y: 380 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 42,
//     camera: {
//       position: { x: 0, y: 1.5, z: -7 },
//       rotation: { x: 0, y: 360 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 47,
//     camera: {
//       position: { x: 0, y: 1.5, z: -2 },
//       rotation: { x: 0, y: 360 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 50,
//     camera: {
//       position: { x: 0, y: 1.5, z: -2 },
//       rotation: { x: 0, y: 270 * (Math.PI / 180), z: 0 },
//     },
//   },
//   {
//     frame: 53,
//     camera: {
//       position: { x: -3.4, y: 1.5, z: -2 },
//       rotation: { x: 0, y: 270 * (Math.PI / 180), z: 0 },
//     },
//   },
// ];
