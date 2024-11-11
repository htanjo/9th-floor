import mansionHighMeshUrl from '../assets/mansion_high.glb?url';
import mansionLowMeshUrl from '../assets/mansion_low.glb?url';
import lightmap01HighTextureUrl from '../assets/lm_01_0001_rgbd_high.webp?url';
import lightmap02HighTextureUrl from '../assets/lm_02_0001_rgbd_high.webp?url';
import lightmap03HighTextureUrl from '../assets/lm_03_0001_rgbd_high.webp?url';
import lightmap04HighTextureUrl from '../assets/lm_04_0001_rgbd_high.webp?url';
import lightmap05HighTextureUrl from '../assets/lm_05_0001_rgbd_high.webp?url';
import lightmap06HighTextureUrl from '../assets/lm_06_0001_rgbd_high.webp?url';
import lightmap07HighTextureUrl from '../assets/lm_07_0001_rgbd_high.webp?url';
import lightmap08HighTextureUrl from '../assets/lm_08_0001_rgbd_high.webp?url';
import lightmap09HighTextureUrl from '../assets/lm_09_0001_rgbd_high.webp?url';
import lightmap10HighTextureUrl from '../assets/lm_10_0001_rgbd_high.webp?url';
import lightmap01LowTextureUrl from '../assets/lm_01_0001_rgbd_low.webp?url';
import lightmap02LowTextureUrl from '../assets/lm_02_0001_rgbd_low.webp?url';
import lightmap03LowTextureUrl from '../assets/lm_03_0001_rgbd_low.webp?url';
import lightmap04LowTextureUrl from '../assets/lm_04_0001_rgbd_low.webp?url';
import lightmap05LowTextureUrl from '../assets/lm_05_0001_rgbd_low.webp?url';
import lightmap06LowTextureUrl from '../assets/lm_06_0001_rgbd_low.webp?url';
import lightmap07LowTextureUrl from '../assets/lm_07_0001_rgbd_low.webp?url';
import lightmap08LowTextureUrl from '../assets/lm_08_0001_rgbd_low.webp?url';
import lightmap09LowTextureUrl from '../assets/lm_09_0001_rgbd_low.webp?url';
import lightmap10LowTextureUrl from '../assets/lm_10_0001_rgbd_low.webp?url';
import environmentOutdoorTextureUrl from '../assets/environment_outdoor.env?url';
import environmentMirrorTextureUrl from '../assets/environment_mirror.env?url';
import particleDustTextureUrl from '../assets/particle_dust.webp?url';
import particleFogTextureUrl from '../assets/particle_fog.webp?url';
import { isDesktop } from './general';

export interface AssetConfig {
  type: 'mesh' | 'texture' | 'cubeTexture';
  name: string;
  url: string;
}

export type AssetConfigs = AssetConfig[];

export const assetConfigs: AssetConfigs = [
  {
    type: 'mesh',
    name: 'mansion_mesh',
    url: isDesktop ? mansionHighMeshUrl : mansionLowMeshUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_01_texture',
    url: isDesktop ? lightmap01HighTextureUrl : lightmap01LowTextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_02_texture',
    url: isDesktop ? lightmap02HighTextureUrl : lightmap02LowTextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_03_texture',
    url: isDesktop ? lightmap03HighTextureUrl : lightmap03LowTextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_04_texture',
    url: isDesktop ? lightmap04HighTextureUrl : lightmap04LowTextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_05_texture',
    url: isDesktop ? lightmap05HighTextureUrl : lightmap05LowTextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_06_texture',
    url: isDesktop ? lightmap06HighTextureUrl : lightmap06LowTextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_07_texture',
    url: isDesktop ? lightmap07HighTextureUrl : lightmap07LowTextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_08_texture',
    url: isDesktop ? lightmap08HighTextureUrl : lightmap08LowTextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_09_texture',
    url: isDesktop ? lightmap09HighTextureUrl : lightmap09LowTextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_10_texture',
    url: isDesktop ? lightmap10HighTextureUrl : lightmap10LowTextureUrl,
  },
  {
    type: 'cubeTexture',
    name: 'environment_outdoor_texture',
    url: environmentOutdoorTextureUrl,
  },
  {
    type: 'cubeTexture',
    name: 'environment_mirror_texture',
    url: environmentMirrorTextureUrl,
  },
  {
    type: 'texture',
    name: 'particle_dust_texture',
    url: particleDustTextureUrl,
  },
  {
    type: 'texture',
    name: 'particle_fog_texture',
    url: particleFogTextureUrl,
  },
];

export function getTextureName(assetName: string) {
  const assetConfig = assetConfigs.find((config) => config.name === assetName);
  if (!assetConfig) {
    return assetName;
  }
  // By default, textures are named according to the URL string.
  return assetConfig.url;
}
