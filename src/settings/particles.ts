import { toRadians } from './general';

interface BaseParticleConfig {
  name: string;
  textureName: string;
  capacity: number;
  emitRate: number;
  updateSpeed: number;
  radius: number;
  radiusRange: number;
  minDirection: {
    x: number;
    y: number;
    z: number;
  };
  maxDirection: {
    x: number;
    y: number;
    z: number;
  };
  minSize: number;
  maxSize: number;
  minScaleX: number;
  minScaleY: number;
  minEmitPower: number;
  maxEmitPower: number;
  maxScaleX: number;
  maxScaleY: number;
  minLifeTime: number;
  maxLifeTime: number;
  minAngularSpeed: number;
  maxAngularSpeed: number;
  gravity: {
    x: number;
    y: number;
    z: number;
  };
}

interface DynamicParticleConfig extends BaseParticleConfig {
  type: 'dynamic';
}

interface StaticParticleConfig extends BaseParticleConfig {
  type: 'static';
  position: {
    x: number;
    y: number;
    z: number;
  };
  parentNodeName: string;
}

export type ParticleConfig = DynamicParticleConfig | StaticParticleConfig;

export type ParticleConfigs = ParticleConfig[];

const baseDustConfig = {
  textureName: 'particle_dust_texture',
  capacity: 400,
  emitRate: 300,
  updateSpeed: 0.002,
  radius: 0.6,
  radiusRange: 0.5,
  minDirection: {
    x: -0.2,
    y: 0.4,
    z: 0.2,
  },
  maxDirection: {
    x: 0.2,
    y: -0.1,
    z: -0.2,
  },
  minSize: 0.01,
  maxSize: 0.015,
  minScaleX: 0.4,
  minScaleY: 1.6,
  maxScaleX: 0.8,
  maxScaleY: 1.2,
  minEmitPower: 0.2,
  maxEmitPower: 1.0,
  minLifeTime: 0.3,
  maxLifeTime: 1.5,
  minAngularSpeed: toRadians(-360),
  maxAngularSpeed: toRadians(360),
  gravity: {
    x: 0,
    y: -0.1,
    z: 0,
  },
};

const baseFogConfig = {
  textureName: 'particle_fog_texture',
  capacity: 160,
  emitRate: 80,
  updateSpeed: 0.001,
  radius: 0.8,
  radiusRange: 0.5,
  minDirection: {
    x: -0.2,
    y: 0.4,
    z: 0.2,
  },
  maxDirection: {
    x: 0.2,
    y: -0.1,
    z: -0.2,
  },
  minSize: 0.5,
  maxSize: 2.0,
  minScaleX: 0.8,
  minScaleY: 0.8,
  maxScaleX: 1.2,
  maxScaleY: 1.2,
  minEmitPower: 0.1,
  maxEmitPower: 0.2,
  minLifeTime: 0.6,
  maxLifeTime: 3.0,
  minAngularSpeed: toRadians(-90),
  maxAngularSpeed: toRadians(90),
  gravity: {
    x: 0,
    y: -0.1,
    z: 0,
  },
};

export const particleConfigs: ParticleConfigs = [
  {
    ...baseDustConfig,
    type: 'dynamic',
    name: 'camera_dust',
    capacity: 300,
    emitRate: 200,
    updateSpeed: 0.004,
    radius: 2,
    minSize: 0.005,
    maxSize: 0.01,
  },
  {
    ...baseDustConfig,
    type: 'static',
    name: 'room_dust_lamp_front_1',
    position: {
      x: 3.4,
      y: 2.2,
      z: -2.3,
    },
    parentNodeName: 'floor_1',
  },
  {
    ...baseDustConfig,
    type: 'static',
    name: 'room_dust_lamp_middle_right_1',
    position: {
      x: 1.8,
      y: 2.2,
      z: -7,
    },
    parentNodeName: 'floor_1',
  },
  {
    ...baseDustConfig,
    type: 'static',
    name: 'room_dust_lamp_middle_left_1',
    position: {
      x: 5,
      y: 2.2,
      z: -7,
    },
    parentNodeName: 'floor_1',
  },
  {
    ...baseDustConfig,
    type: 'static',
    name: 'room_dust_lamp_front_2',
    position: {
      x: 3.4,
      y: 5.8,
      z: -2.3,
    },
    parentNodeName: 'floor_2',
  },
  {
    ...baseDustConfig,
    type: 'static',
    name: 'room_dust_lamp_middle_right_2',
    position: {
      x: 1.8,
      y: 5.8,
      z: -7,
    },
    parentNodeName: 'floor_2',
  },
  {
    ...baseDustConfig,
    type: 'static',
    name: 'room_dust_lamp_middle_left_2',
    position: {
      x: 5,
      y: 5.8,
      z: -7,
    },
    parentNodeName: 'floor_2',
  },
  {
    ...baseDustConfig,
    type: 'static',
    name: 'room_dust_signboard',
    position: {
      x: 5.1,
      y: 5.8,
      z: -4,
    },
    capacity: 100,
    emitRate: 50,
    updateSpeed: 0.001,
    radius: 0.2,
    parentNodeName: 'floor_2',
  },
  {
    ...baseDustConfig,
    type: 'static',
    name: 'room_dust_window_right',
    position: {
      x: 2.7,
      y: 2.3,
      z: -17.4,
    },
    radius: 0.8,
    minSize: 0.005,
    maxSize: 0.01,
    parentNodeName: 'stairs',
  },
  {
    ...baseDustConfig,
    type: 'static',
    name: 'room_dust_window_left',
    position: {
      x: 4.7,
      y: 2.3,
      z: -17.4,
    },
    radius: 0.8,
    minSize: 0.005,
    maxSize: 0.01,
    parentNodeName: 'stairs',
  },
  {
    ...baseDustConfig,
    type: 'static',
    name: 'room_dust_stairs_top',
    position: {
      x: 3.5,
      y: 1.6,
      z: -15.5,
    },
    radius: 0.8,
    parentNodeName: 'stairs',
  },
  {
    ...baseDustConfig,
    type: 'static',
    name: 'room_dust_stairs_middle',
    position: {
      x: 3.7,
      y: 1.1,
      z: -14.5,
    },
    radius: 0.8,
    parentNodeName: 'stairs',
  },
  {
    ...baseDustConfig,
    type: 'static',
    name: 'room_dust_stairs_bottom',
    position: {
      x: 3.9,
      y: 0.5,
      z: -13.5,
    },
    radius: 0.8,
    parentNodeName: 'stairs',
  },
  {
    ...baseDustConfig,
    type: 'static',
    name: 'room_dust_table',
    position: {
      x: 1.7,
      y: 1.2,
      z: -9.2,
    },
    parentNodeName: 'floor_1',
  },
  {
    ...baseFogConfig,
    type: 'static',
    name: 'room_fog_signboard',
    capacity: 100,
    emitRate: 50,
    position: {
      x: 5.3,
      y: 5.8,
      z: -4,
    },
    radius: 0.1,
    minDirection: {
      x: -0.02,
      y: 0.04,
      z: 0.02,
    },
    maxDirection: {
      x: 0.02,
      y: -0.01,
      z: -0.02,
    },
    gravity: {
      x: 0,
      y: -0.01,
      z: 0,
    },
    parentNodeName: 'floor_2',
  },
  {
    ...baseFogConfig,
    type: 'static',
    name: 'room_fog_window_right',
    position: {
      x: 2.7,
      y: 2.3,
      z: -17.4,
    },
    parentNodeName: 'stairs',
  },
  {
    ...baseFogConfig,
    type: 'static',
    name: 'room_fog_window_left',
    position: {
      x: 4.7,
      y: 2.3,
      z: -17.4,
    },
    parentNodeName: 'stairs',
  },
  {
    ...baseFogConfig,
    type: 'static',
    name: 'room_fog_stairs_top',
    position: {
      x: 3.3,
      y: 1.1,
      z: -15.5,
    },
    parentNodeName: 'stairs',
  },
  {
    ...baseFogConfig,
    type: 'static',
    name: 'room_fog_stairs_bottom',
    position: {
      x: 3.8,
      y: 0.5,
      z: -13.5,
    },
    parentNodeName: 'stairs',
  },
  {
    ...baseDustConfig,
    type: 'static',
    name: 'hallway_dust_lamp_front',
    position: {
      x: 0,
      y: 5.8,
      z: -5.7,
    },
    capacity: 600,
    emitRate: 500,
    radius: 1.0,
    parentNodeName: 'hallway',
  },
  {
    ...baseDustConfig,
    type: 'static',
    name: 'hallway_dust_lamp_back',
    position: {
      x: 0,
      y: 5.8,
      z: 5.7,
    },
    capacity: 600,
    emitRate: 500,
    radius: 1.0,
    minSize: 0.01,
    maxSize: 0.02,
    parentNodeName: 'hallway',
  },
];
