import { qualityMode, toRadians } from './general';

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
  capacity: 200,
  emitRate: 100,
  updateSpeed: 0.002,
  radius: 0.5,
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
  maxSize: 0.02,
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
  capacity: 60,
  emitRate: 50,
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

export const particleConfigs: ParticleConfigs = qualityMode
  ? [
      {
        ...baseDustConfig,
        type: 'dynamic',
        name: 'camera_dust',
        updateSpeed: 0.004,
        radius: 1.5,
        minSize: 0.005,
        maxSize: 0.01,
      },
      {
        ...baseDustConfig,
        type: 'static',
        name: 'lamp_front_upper_dust',
        position: {
          x: 3.4,
          y: 2.2,
          z: -2.3,
        },
        parentNodeName: 'lower_floor',
      },
      {
        ...baseDustConfig,
        type: 'static',
        name: 'lamp_center_right_upper_dust',
        position: {
          x: 1.8,
          y: 2.2,
          z: -7,
        },
        parentNodeName: 'lower_floor',
      },
      {
        ...baseDustConfig,
        type: 'static',
        name: 'lamp_center_left_upper_dust',
        position: {
          x: 5,
          y: 2.2,
          z: -7,
        },
        parentNodeName: 'lower_floor',
      },
      {
        ...baseDustConfig,
        type: 'static',
        name: 'lamp_front_upper_dust',
        position: {
          x: 3.4,
          y: 5.8,
          z: -2.3,
        },
        parentNodeName: 'upper_floor',
      },
      {
        ...baseDustConfig,
        type: 'static',
        name: 'lamp_center_right_upper_dust',
        position: {
          x: 1.8,
          y: 5.8,
          z: -7,
        },
        parentNodeName: 'upper_floor',
      },
      {
        ...baseDustConfig,
        type: 'static',
        name: 'lamp_center_left_upper_dust',
        position: {
          x: 5,
          y: 5.8,
          z: -7,
        },
        parentNodeName: 'upper_floor',
      },
      {
        ...baseDustConfig,
        type: 'static',
        name: 'signboard_dust',
        position: {
          x: 5.1,
          y: 5.8,
          z: -4,
        },
        capacity: 60,
        emitRate: 40,
        updateSpeed: 0.001,
        radius: 0.2,
        parentNodeName: 'upper_floor',
      },
      {
        ...baseDustConfig,
        type: 'static',
        name: 'window_right_dust',
        position: {
          x: 2.7,
          y: 2.3,
          z: -17.4,
        },
        radius: 0.8,
        minSize: 0.007,
        maxSize: 0.014,
        parentNodeName: 'stairs',
      },
      {
        ...baseDustConfig,
        type: 'static',
        name: 'window_left_dust',
        position: {
          x: 4.7,
          y: 2.3,
          z: -17.4,
        },
        radius: 0.8,
        minSize: 0.007,
        maxSize: 0.014,
        parentNodeName: 'stairs',
      },
      {
        ...baseDustConfig,
        type: 'static',
        name: 'stairs_top_dust',
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
        name: 'stairs_center_dust',
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
        name: 'stairs_bottom_dust',
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
        name: 'table_dust',
        position: {
          x: 1.7,
          y: 1.2,
          z: -9.2,
        },
        parentNodeName: 'lower_floor',
      },
      {
        ...baseFogConfig,
        type: 'static',
        name: 'signboard_fog',
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
        parentNodeName: 'upper_floor',
      },
      {
        ...baseFogConfig,
        type: 'static',
        name: 'window_right_fog',
        position: {
          x: 2.7,
          y: 2.3,
          z: -17.2,
        },
        parentNodeName: 'stairs',
      },
      {
        ...baseFogConfig,
        type: 'static',
        name: 'window_left_fog',
        position: {
          x: 4.7,
          y: 2.3,
          z: -17.2,
        },
        parentNodeName: 'stairs',
      },
      {
        ...baseFogConfig,
        type: 'static',
        name: 'stairs_top_fog',
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
        name: 'stairs_bottom_fog',
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
        name: 'hallway_front_lamp_dust',
        position: {
          x: 0,
          y: 5.8,
          z: -5.7,
        },
        minSize: 0.012,
        maxSize: 0.024,
        parentNodeName: 'hallway',
      },
      {
        ...baseDustConfig,
        type: 'static',
        name: 'hallway_back_lamp_dust',
        position: {
          x: 0,
          y: 5.8,
          z: 5.7,
        },
        minSize: 0.012,
        maxSize: 0.024,
        parentNodeName: 'hallway',
      },
    ]
  : [];
