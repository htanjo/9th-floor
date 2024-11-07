import mansionMeshUrl from '../assets/mansion.glb?url';
import lightmap1TextureUrl from '../assets/lightmap_1_0001.hdr?url';
import lightmap2TextureUrl from '../assets/lightmap_2_0001.hdr?url';
import lightmap3TextureUrl from '../assets/lightmap_3_0001.hdr?url';
import lightmap4TextureUrl from '../assets/lightmap_4_0001.hdr?url';
import lightmap5TextureUrl from '../assets/lightmap_5_0001.hdr?url';
import lightmapAnomalyTextureUrl from '../assets/lightmap_anomaly_0001.hdr?url';
import lightmapHallwayTextureUrl from '../assets/lightmap_hallway_0001.hdr?url';
import environmentOutdoorTextureUrl from '../assets/environment_outdoor.hdr?url';
import environmentMirrorTextureUrl from '../assets/environment_mirror.hdr?url';
import particleDustTextureUrl from '../assets/particle_dust.png?url';
import particleFogTextureUrl from '../assets/particle_fog.png?url';

export interface AssetConfig {
  type: 'mesh' | 'texture' | 'hdrCubeTexture';
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
    name: 'lightmap_1_texture',
    url: lightmap1TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_2_texture',
    url: lightmap2TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_3_texture',
    url: lightmap3TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_4_texture',
    url: lightmap4TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_5_texture',
    url: lightmap5TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_anomaly_texture',
    url: lightmapAnomalyTextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_hallway_texture',
    url: lightmapHallwayTextureUrl,
  },
  {
    type: 'hdrCubeTexture',
    name: 'environment_outdoor_texture',
    url: environmentOutdoorTextureUrl,
  },
  {
    type: 'hdrCubeTexture',
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
