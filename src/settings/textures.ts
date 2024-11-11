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

const roomLightmapAnimation = {
  targetProperty: 'level',
  ...createAnimationConfig('flickerVerySlowGentle', 1.0, 10),
};

export const textureConfigs: TextureConfigs = [
  {
    name: 'lightmap_01_texture',
    originalName: getTextureName('lightmap_01_texture'),
    animation: roomLightmapAnimation,
  },
  {
    name: 'lightmap_02_texture',
    originalName: getTextureName('lightmap_02_texture'),
    animation: roomLightmapAnimation,
  },
  {
    name: 'lightmap_03_texture',
    originalName: getTextureName('lightmap_03_texture'),
    animation: roomLightmapAnimation,
  },
  {
    name: 'lightmap_04_texture',
    originalName: getTextureName('lightmap_04_texture'),
    animation: roomLightmapAnimation,
  },
  {
    name: 'lightmap_05_texture',
    originalName: getTextureName('lightmap_05_texture'),
    animation: roomLightmapAnimation,
  },
  {
    name: 'lightmap_06_texture',
    originalName: getTextureName('lightmap_06_texture'),
    animation: roomLightmapAnimation,
  },
  {
    name: 'lightmap_07_texture',
    originalName: getTextureName('lightmap_07_texture'),
    animation: roomLightmapAnimation,
  },
  {
    name: 'lightmap_08_texture',
    originalName: getTextureName('lightmap_08_texture'),
    animation: roomLightmapAnimation,
  },
  {
    name: 'lightmap_09_texture',
    originalName: getTextureName('lightmap_09_texture'),
    animation: roomLightmapAnimation,
  },
  {
    name: 'lightmap_10_texture',
    originalName: getTextureName('lightmap_10_texture'),
    animation: roomLightmapAnimation,
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
