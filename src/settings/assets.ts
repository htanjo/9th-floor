import mansionMeshUrl from '../assets/mansion.glb?url';
import lightmap01TextureUrl from '../assets/lm_01_0001_rgbd.png?url';
import lightmap02TextureUrl from '../assets/lm_02_0001_rgbd.png?url';
import lightmap03TextureUrl from '../assets/lm_03_0001_rgbd.png?url';
import lightmap04TextureUrl from '../assets/lm_04_0001_rgbd.png?url';
import lightmap05TextureUrl from '../assets/lm_05_0001_rgbd.png?url';
import lightmap06TextureUrl from '../assets/lm_06_0001_rgbd.png?url';
import lightmap07TextureUrl from '../assets/lm_07_0001_rgbd.png?url';
import lightmap08TextureUrl from '../assets/lm_08_0001_rgbd.png?url';
import lightmap09TextureUrl from '../assets/lm_09_0001_rgbd.png?url';
import lightmap10TextureUrl from '../assets/lm_10_0001_rgbd.png?url';
import environmentOutdoorTextureUrl from '../assets/environment_outdoor.env?url';
import environmentMirrorTextureUrl from '../assets/environment_mirror.env?url';
import particleDustTextureUrl from '../assets/particle_dust.png?url';
import particleFogTextureUrl from '../assets/particle_fog.png?url';

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
    url: mansionMeshUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_01_texture',
    url: lightmap01TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_02_texture',
    url: lightmap02TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_03_texture',
    url: lightmap03TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_04_texture',
    url: lightmap04TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_05_texture',
    url: lightmap05TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_06_texture',
    url: lightmap06TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_07_texture',
    url: lightmap07TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_08_texture',
    url: lightmap08TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_09_texture',
    url: lightmap09TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_10_texture',
    url: lightmap10TextureUrl,
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
