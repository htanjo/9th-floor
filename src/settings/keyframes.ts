export interface Keyframe {
  position: { x: number; y: number; z: number };
}

export type Keyframes = Keyframe[];

// function toRadians(degrees: number) {
//   return degrees * (Math.PI / 180);
// }

export const keyframes: Keyframes = [
  {
    position: { x: -3.4, y: 5.1, z: 3 },
  },
  {
    position: { x: -3.4, y: 5.1, z: 1.4 },
  },
  {
    position: { x: -3.4, y: 5.1, z: -1 },
  },
  {
    position: { x: -2.3, y: 5.1, z: -1.9 },
  },
  {
    position: { x: -0.1, y: 5.1, z: -2 },
  },
  {
    position: { x: 0.6, y: 5.1, z: -2.8 },
  },
  {
    position: { x: -0.1, y: 5.1, z: -5 },
  },
  {
    position: { x: 0, y: 5.1, z: -7.5 },
  },
  {
    position: { x: 0.8, y: 5.1, z: -10 },
  },
  {
    position: { x: 1.2, y: 4.5, z: -12 },
  },
  {
    position: { x: 1.1, y: 3.3, z: -14.5 },
  },
  {
    position: { x: 0.5, y: 3.3, z: -15.2 },
  },
  {
    position: { x: -0.5, y: 3.3, z: -15.2 },
  },
  {
    position: { x: -1.1, y: 3.3, z: -14.5 },
  },
  {
    position: { x: -1.2, y: 2.1, z: -12 },
  },
  {
    position: { x: -0.9, y: 1.5, z: -10 },
  },
  {
    position: { x: -0.1, y: 1.5, z: -7.5 },
  },
  {
    position: { x: -0.1, y: 1.5, z: -5 },
  },
  {
    position: { x: 0.4, y: 1.5, z: -2.6 },
  },
  {
    position: { x: -0.4, y: 1.5, z: -1.8 },
  },
  {
    position: { x: -2.3, y: 1.5, z: -2 },
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
