import { AnimationConfig, createAnimationConfig } from './animations';
import { getTextureName } from './assets';

export interface TextureConfig {
  name: string;
  originalName: string;
  animation?: {
    targetProperty: string;
  } & AnimationConfig;
}

export type TextureConfigs = TextureConfig[];

export const textureConfigs: TextureConfigs = [
  {
    name: 'lightmap_1_texture',
    originalName: getTextureName('lightmap_1_texture'),
    animation: {
      targetProperty: 'level',
      ...createAnimationConfig('flickerVerySlowGentle', 1.0, 10),
    },
  },
  {
    name: 'lightmap_2_texture',
    originalName: getTextureName('lightmap_2_texture'),
    animation: {
      targetProperty: 'level',
      ...createAnimationConfig('flickerVerySlowGentle', 1.0, 10),
    },
  },
  {
    name: 'lightmap_3_texture',
    originalName: getTextureName('lightmap_3_texture'),
    animation: {
      targetProperty: 'level',
      ...createAnimationConfig('flickerVerySlowGentle', 1.0, 10),
    },
  },
  {
    name: 'lightmap_4_texture',
    originalName: getTextureName('lightmap_4_texture'),
    animation: {
      targetProperty: 'level',
      ...createAnimationConfig('flickerVerySlowGentle', 1.0, 10),
    },
  },
  {
    name: 'lightmap_5_texture',
    originalName: getTextureName('lightmap_5_texture'),
    animation: {
      targetProperty: 'level',
      ...createAnimationConfig('flickerVerySlowGentle', 1.0, 10),
    },
  },
  {
    name: 'lightmap_anomaly_texture',
    originalName: getTextureName('lightmap_anomaly_texture'),
    animation: {
      targetProperty: 'level',
      ...createAnimationConfig('flickerVerySlowGentle', 1.0, 10),
    },
  },
  {
    name: 'lightmap_hallway_texture',
    originalName: getTextureName('lightmap_hallway_texture'),
    animation: {
      targetProperty: 'level',
      ...createAnimationConfig('flickerVeryFastSlight', 1.0, 10),
    },
  },
  {
    name: 'environment_outdoor_texture',
    originalName: getTextureName('environment_outdoor_texture'),
  },
  {
    name: 'environment_mirror_texture',
    originalName: getTextureName('environment_mirror_texture'),
  },
  {
    name: 'particle_dust_texture',
    originalName: getTextureName('particle_dust_texture'),
  },
  {
    name: 'particle_fog_texture',
    originalName: getTextureName('particle_fog_texture'),
  },
];
