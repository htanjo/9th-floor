import { AnimationConfig, createAnimationConfig } from './animations';

export interface LightConfig {
  name: string;
  variant: 'PointLight' | 'DirectionalLight';
  position: {
    x: number;
    y: number;
    z: number;
  };
  intensity: number;
  diffuseColorHex: string;
  radius: number;
  parentNodeName: string;
  animation?: {
    targetProperty: string;
  } & AnimationConfig;
}

export type LightConfigs = LightConfig[];

export const lightConfigs: LightConfigs = [
  {
    name: 'window_composite_light',
    variant: 'PointLight',
    position: {
      x: 3.4,
      y: 4.6,
      z: -20.5,
    },
    intensity: 3.6,
    diffuseColorHex: '#85bcff',
    radius: 1.6,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerVerySlow', 3.6, 30),
    },
  },
  {
    name: 'window_composite_gentle_light',
    variant: 'PointLight',
    position: {
      x: 3.4,
      y: 4.6,
      z: -20.5,
    },
    intensity: 1.2,
    diffuseColorHex: '#85bcff',
    radius: 1.6,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerVerySlow', 1.2, 30),
    },
  },
  {
    name: 'window_distant_light',
    variant: 'PointLight',
    position: {
      x: 3.4,
      y: 5,
      z: -24,
    },
    intensity: 2.8,
    diffuseColorHex: '#fffcde',
    radius: 1.2,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerVerySlow', 2.8, 30),
    },
  },
  {
    name: 'window_inner_light',
    variant: 'PointLight',
    position: {
      x: 3,
      y: 4.4,
      z: -15,
    },
    intensity: 4.2,
    diffuseColorHex: '#85bcff',
    radius: 1.6,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerVerySlow', 4.2, 30),
    },
  },
  {
    name: 'window_left_light',
    variant: 'PointLight',
    position: {
      x: 4.7,
      y: 5,
      z: -20,
    },
    intensity: 1.5,
    diffuseColorHex: '#85bcff',
    radius: 1,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerVerySlow', 1.5, 30),
    },
  },
  {
    name: 'window_right_light',
    variant: 'PointLight',
    position: {
      x: 2.1,
      y: 5,
      z: -20,
    },
    intensity: 1.5,
    diffuseColorHex: '#85bcff',
    radius: 1,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerVerySlow', 1.5, 30),
    },
  },
  {
    name: 'window_sun_light',
    variant: 'PointLight',
    position: {
      x: 1.4,
      y: 8,
      z: -26,
    },
    intensity: 0.3,
    diffuseColorHex: '#ffebc9',
    radius: 1.6,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerVerySlow', 0.3, 30),
    },
  },
  {
    name: 'floor_1_light',
    variant: 'PointLight',
    position: {
      x: 3.4,
      y: 2.2,
      z: -1.95,
    },
    intensity: 0.2,
    diffuseColorHex: '#ffc7a4',
    radius: 0.15,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerMedium', 0.2, 30),
    },
  },
  {
    name: 'floor_2_light',
    variant: 'PointLight',
    position: {
      x: 3.4,
      y: 5.8,
      z: -1.95,
    },
    intensity: 0.2,
    diffuseColorHex: '#ffc7a4',
    radius: 0.15,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerMedium', 0.2, 30),
    },
  },
  {
    name: 'floor_2_distant_light',
    variant: 'PointLight',
    position: {
      x: 3.4,
      y: 6.2,
      z: 3,
    },
    intensity: 1.8,
    diffuseColorHex: '#ffc7a4',
    radius: 0.2,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerMedium', 1.8, 30),
    },
  },
  {
    name: 'stairs_light',
    variant: 'PointLight',
    position: {
      x: 5,
      y: 2,
      z: -13,
    },
    intensity: 0.2,
    diffuseColorHex: '#ffc7a4',
    radius: 0.1,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerSlow', 0.2, 30),
    },
  },
  {
    name: 'room_composite_light',
    variant: 'PointLight',
    position: {
      x: 3.4,
      y: 5.2,
      z: -15,
    },
    intensity: 0.15,
    diffuseColorHex: '#ffc7a4',
    radius: 0.4,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerFast', 0.15, 30),
    },
  },
  {
    name: 'signboard_left_light',
    variant: 'PointLight',
    position: {
      x: 3.4,
      y: 6.4,
      z: -3,
    },
    intensity: 0.05,
    diffuseColorHex: '#ffeed3',
    radius: 0.1,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerFast', 0.05, 30),
    },
  },
  {
    name: 'signboard_right_light',
    variant: 'PointLight',
    position: {
      x: 2.4,
      y: 6,
      z: -8,
    },
    intensity: 0.8,
    diffuseColorHex: '#85bcff',
    radius: 0.1,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerVeryFast', 0.8, 30),
    },
  },
  {
    name: 'table_light',
    variant: 'PointLight',
    position: {
      x: 1.7,
      y: 1.1,
      z: -9.2,
    },
    intensity: 0.1,
    diffuseColorHex: '#ffb575',
    radius: 0.2,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerVeryFast', 0.1, 30),
    },
  },
  {
    name: 'top_right_light',
    variant: 'DirectionalLight',
    position: {
      x: 0.4,
      y: -1,
      z: -0.3,
    },
    intensity: 0.08,
    diffuseColorHex: '#ffdfc7',
    radius: 0.2,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerMedium', 0.08, 30),
    },
  },
  {
    name: 'top_left_light',
    variant: 'DirectionalLight',
    position: {
      x: -0.4,
      y: -1,
      z: -0.3,
    },
    intensity: 0.08,
    diffuseColorHex: '#ffdfc7',
    radius: 0.2,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerMedium', 0.08, 30),
    },
  },
  {
    name: 'lamp_center_1_light',
    variant: 'PointLight',
    position: {
      x: 3.4,
      y: 2.2,
      z: -10,
    },
    intensity: 0.18,
    diffuseColorHex: '#ffdfc7',
    radius: 0.3,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerFast', 0.18, 30),
    },
  },
  {
    name: 'lamp_center_2_light',
    variant: 'PointLight',
    position: {
      x: 3.4,
      y: 5.8,
      z: -10,
    },
    intensity: 0.18,
    diffuseColorHex: '#ffdfc7',
    radius: 0.3,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerFast', 0.18, 30),
    },
  },
  {
    name: 'lamp_front_1_light',
    variant: 'PointLight',
    position: {
      x: 3.6,
      y: 2.2,
      z: -2.6,
    },
    intensity: 0.02,
    diffuseColorHex: '#ffdfc7',
    radius: 0.1,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerMedium', 0.02, 30),
    },
  },
  {
    name: 'lamp_front_2_light',
    variant: 'PointLight',
    position: {
      x: 3.6,
      y: 5.8,
      z: -2.6,
    },
    intensity: 0.02,
    diffuseColorHex: '#ffdfc7',
    radius: 0.1,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerMedium', 0.02, 30),
    },
  },
  {
    name: 'door_1_light',
    variant: 'PointLight',
    position: {
      x: 2.8,
      y: 1.2,
      z: -4.4,
    },
    intensity: 0.15,
    diffuseColorHex: '#ffdfc7',
    radius: 0.2,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerMedium', 0.15, 30),
    },
  },
  {
    name: 'door_2_light',
    variant: 'PointLight',
    position: {
      x: 2.8,
      y: 4.8,
      z: -4.4,
    },
    intensity: 0.15,
    diffuseColorHex: '#ffdfc7',
    radius: 0.2,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerMedium', 0.15, 30),
    },
  },
  {
    name: 'mirror_light',
    variant: 'PointLight',
    position: {
      x: 3.4,
      y: 5.8,
      z: -10,
    },
    intensity: 0.18,
    diffuseColorHex: '#ffdfc7',
    radius: 0.3,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerSlow', 0.18, 30),
    },
  },
  {
    name: 'chair_front_2_light',
    variant: 'PointLight',
    position: {
      x: 3.4,
      y: 5.8,
      z: -3.8,
    },
    intensity: 0.3,
    diffuseColorHex: '#ffdfc7',
    radius: 0.2,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerMedium', 0.3, 30),
    },
  },
  {
    name: 'sword_light',
    variant: 'PointLight',
    position: {
      x: 2,
      y: 6.4,
      z: -12,
    },
    intensity: 0.06,
    diffuseColorHex: '#ffdfc7',
    radius: 0.3,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerSlow', 0.06, 30),
    },
  },
  {
    name: 'phonograph_light',
    variant: 'PointLight',
    position: {
      x: 5.1,
      y: 5.3,
      z: -9,
    },
    intensity: 0.06,
    diffuseColorHex: '#ffdfc7',
    radius: 0.3,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerSlow', 0.06, 30),
    },
  },
  {
    name: 'hallway_front_light',
    variant: 'PointLight',
    position: {
      x: 0,
      y: 5.8,
      z: -6.05,
    },
    intensity: 0.25,
    diffuseColorHex: '#ffc7a4',
    radius: 0.1,
    parentNodeName: 'hallway',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerVeryFastGentle', 0.25, 30),
    },
  },
  {
    name: 'hallway_back_light',
    variant: 'PointLight',
    position: {
      x: 0,
      y: 5.8,
      z: 6.05,
    },
    intensity: 0.25,
    diffuseColorHex: '#ffc7a4',
    radius: 0.1,
    parentNodeName: 'hallway',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerVeryFastGentle', 0.25, 30),
    },
  },
  {
    name: 'hallway_lamp_front_light',
    variant: 'PointLight',
    position: {
      x: 0.2,
      y: 5.8,
      z: -5.4,
    },
    intensity: 0.02,
    diffuseColorHex: '#ffdfc7',
    radius: 0.1,
    parentNodeName: 'hallway',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerVeryFastGentle', 0.02, 30),
    },
  },
  {
    name: 'hallway_lamp_back_light',
    variant: 'PointLight',
    position: {
      x: -0.2,
      y: 5.8,
      z: 5.4,
    },
    intensity: 0.02,
    diffuseColorHex: '#ffdfc7',
    radius: 0.1,
    parentNodeName: 'hallway',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerVeryFastGentle', 0.02, 30),
    },
  },
  {
    name: 'hallway_top_right_light',
    variant: 'DirectionalLight',
    position: {
      x: 0.4,
      y: -1,
      z: -0.3,
    },
    intensity: 0.15,
    diffuseColorHex: '#ffdfc7',
    radius: 0.2,
    parentNodeName: 'hallway',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerVeryFastGentle', 0.15, 30),
    },
  },
];
