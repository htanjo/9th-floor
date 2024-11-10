import mansionMeshUrl from '../assets/models/mansion.gltf?url';
import upperFloorMeshUrl from '../assets/models/upper_floor.gltf?url';
import lowerFloorMeshUrl from '../assets/models/lower_floor.gltf?url';
import stairsMeshUrl from '../assets/models/stairs.gltf?url';
import anomalyMeshUrl from '../assets/models/anomaly.gltf?url';
import hallwayMeshUrl from '../assets/models/hallway.gltf?url';
import lightmapUpper1TextureUrl from '../assets/lm_upper_1_0001_rgbd.png?url';
import lightmapUpper2TextureUrl from '../assets/lm_upper_2_0001_rgbd.png?url';
import lightmapUpper3TextureUrl from '../assets/lm_upper_3_0001_rgbd.png?url';
import lightmapUpper4TextureUrl from '../assets/lm_upper_4_0001_rgbd.png?url';
import lightmapUpper5TextureUrl from '../assets/lm_upper_5_0001_rgbd.png?url';
import lightmapUpper6TextureUrl from '../assets/lm_upper_6_0001_rgbd.png?url';
import lightmapLower1TextureUrl from '../assets/lm_lower_1_0001_rgbd.png?url';
import lightmapLower2TextureUrl from '../assets/lm_lower_2_0001_rgbd.png?url';
import lightmapLower3TextureUrl from '../assets/lm_lower_3_0001_rgbd.png?url';
import lightmapLower4TextureUrl from '../assets/lm_lower_4_0001_rgbd.png?url';
import lightmapLower5TextureUrl from '../assets/lm_lower_5_0001_rgbd.png?url';
import lightmapLower6TextureUrl from '../assets/lm_lower_6_0001_rgbd.png?url';
import lightmapLower7TextureUrl from '../assets/lm_lower_7_0001_rgbd.png?url';
import lightmapStairs1TextureUrl from '../assets/lm_stairs_1_0001_rgbd.png?url';
import lightmapStairs2TextureUrl from '../assets/lm_stairs_2_0001_rgbd.png?url';
import lightmapStairs3TextureUrl from '../assets/lm_stairs_3_0001_rgbd.png?url';
import lightmapStairs4TextureUrl from '../assets/lm_stairs_4_0001_rgbd.png?url';
import lightmapStairs5TextureUrl from '../assets/lm_stairs_5_0001_rgbd.png?url';
import lightmapStairs6TextureUrl from '../assets/lm_stairs_6_0001_rgbd.png?url';
import lightmapAnomalyTextureUrl from '../assets/lm_anomaly_0001_rgbd.png?url';
import lightmapHallwayTextureUrl from '../assets/lm_hallway_0001_rgbd.png?url';
import lightmap1TextureUrl from '../assets/lightmap_1_0001.webp?url';
import lightmap2TextureUrl from '../assets/lightmap_2_0001.webp?url';
import lightmap3TextureUrl from '../assets/lightmap_3_0001.webp?url';
import lightmap4TextureUrl from '../assets/lightmap_4_0001.webp?url';
import lightmap5TextureUrl from '../assets/lightmap_5_0001.webp?url';
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
  // {
  //   type: 'mesh',
  //   name: 'mansion_mesh',
  //   url: mansionMeshUrl,
  // },
  {
    type: 'mesh',
    name: 'upper_floor_mesh',
    url: upperFloorMeshUrl,
  },
  {
    type: 'mesh',
    name: 'lower_floor_mesh',
    url: lowerFloorMeshUrl,
  },
  {
    type: 'mesh',
    name: 'stairs_mesh',
    url: stairsMeshUrl,
  },
  {
    type: 'mesh',
    name: 'anomaly_mesh',
    url: anomalyMeshUrl,
  },
  {
    type: 'mesh',
    name: 'hallway_mesh',
    url: hallwayMeshUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_upper_1_texture',
    url: lightmapUpper1TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_upper_2_texture',
    url: lightmapUpper2TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_upper_3_texture',
    url: lightmapUpper3TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_upper_4_texture',
    url: lightmapUpper4TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_upper_5_texture',
    url: lightmapUpper5TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_upper_6_texture',
    url: lightmapUpper6TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_lower_1_texture',
    url: lightmapLower1TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_lower_2_texture',
    url: lightmapLower2TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_lower_3_texture',
    url: lightmapLower3TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_lower_4_texture',
    url: lightmapLower4TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_lower_5_texture',
    url: lightmapLower5TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_lower_6_texture',
    url: lightmapLower6TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_lower_7_texture',
    url: lightmapLower7TextureUrl,
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
    name: 'lightmap_stairs_1_texture',
    url: lightmapStairs1TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_stairs_2_texture',
    url: lightmapStairs2TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_stairs_3_texture',
    url: lightmapStairs3TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_stairs_4_texture',
    url: lightmapStairs4TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_stairs_5_texture',
    url: lightmapStairs5TextureUrl,
  },
  {
    type: 'texture',
    name: 'lightmap_stairs_6_texture',
    url: lightmapStairs6TextureUrl,
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
