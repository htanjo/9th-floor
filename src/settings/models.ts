import { AnimationConfig, createAnimationConfig } from './animations';

export interface MaterialConfig {
  name: string;
  lightmapTextureName?: string;
  reflectionTextureName?: string;
  refractionTextureName?: string;
  emissiveColorHex?: string;
  emissiveIntensity?: number;
  fogEnabled?: boolean;
  zOffset?: number;
  alphaDisabled?: boolean;
  alphaBlendDisabled?: boolean;
}

export type MaterialConfigs = MaterialConfig[];

export interface MeshConfig {
  name: string;
  effectiveLightNames: string[];
  parentNodeName: string;
  animation?: {
    targetProperty: string;
  } & AnimationConfig;
}

export type MeshConfigs = MeshConfig[];

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

export const floorHeight = 3.6;

export const materialConfigs: MaterialConfigs = [
  {
    name: 'ceiling_center',
    lightmapTextureName: 'lightmap_1_texture',
  },
  {
    name: 'ceiling_edge',
    lightmapTextureName: 'lightmap_1_texture',
  },
  {
    name: 'cornice',
    lightmapTextureName: 'lightmap_1_texture',
  },
  {
    name: 'floor_center',
    lightmapTextureName: 'lightmap_1_texture',
  },
  {
    name: 'floor_edge',
    lightmapTextureName: 'lightmap_1_texture',
  },
  {
    name: 'floor_gate',
    lightmapTextureName: 'lightmap_1_texture',
  },
  {
    name: 'floor_medallion',
    lightmapTextureName: 'lightmap_1_texture',
  },
  {
    name: 'wainscot',
    lightmapTextureName: 'lightmap_1_texture',
  },
  {
    name: 'wall_room',
    lightmapTextureName: 'lightmap_1_texture',
  },
  {
    name: 'wall_stairs',
    lightmapTextureName: 'lightmap_1_texture',
  },
  {
    name: 'door',
    lightmapTextureName: 'lightmap_2_texture',
  },
  {
    name: 'lamp_base',
    lightmapTextureName: 'lightmap_2_texture',
  },
  {
    name: 'lamp_shade_off',
    lightmapTextureName: 'lightmap_2_texture',
  },
  {
    name: 'pillar',
    lightmapTextureName: 'lightmap_2_texture',
  },
  {
    name: 'railing_baluster',
    lightmapTextureName: 'lightmap_2_texture',
  },
  {
    name: 'railing_base',
    lightmapTextureName: 'lightmap_2_texture',
  },
  {
    name: 'railing_handrail',
    lightmapTextureName: 'lightmap_2_texture',
  },
  {
    name: 'railing_newel',
    lightmapTextureName: 'lightmap_2_texture',
  },
  {
    name: 'stairs_back',
    lightmapTextureName: 'lightmap_2_texture',
  },
  {
    name: 'stairs_landing',
    lightmapTextureName: 'lightmap_2_texture',
  },
  {
    name: 'stairs_steps',
    lightmapTextureName: 'lightmap_2_texture',
  },
  {
    name: 'window_frame',
    lightmapTextureName: 'lightmap_2_texture',
  },
  {
    name: 'bookshelf',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'buffet',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'chair',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'clock',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'console_table',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'corner_cabinet',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'library_table',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'picture_canvas',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'picture_frame_black',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'picture_frame_gold',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'picture_frame_silver',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'signboard',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'table_lamp_base',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'book',
    lightmapTextureName: 'lightmap_4_texture',
  },
  {
    name: 'bottle',
    lightmapTextureName: 'lightmap_4_texture',
  },
  {
    name: 'box',
    lightmapTextureName: 'lightmap_4_texture',
  },
  {
    name: 'cat',
    lightmapTextureName: 'lightmap_4_texture',
  },
  {
    name: 'cat_cloth',
    lightmapTextureName: 'lightmap_4_texture',
  },
  {
    name: 'globe',
    lightmapTextureName: 'lightmap_4_texture',
  },
  {
    name: 'lantern',
    lightmapTextureName: 'lightmap_4_texture',
  },
  {
    name: 'mirror_frame',
    lightmapTextureName: 'lightmap_4_texture',
  },
  {
    name: 'mirror_surface',
    lightmapTextureName: 'lightmap_4_texture',
    reflectionTextureName: 'environment_mirror_texture',
  },
  {
    name: 'phonograph',
    lightmapTextureName: 'lightmap_4_texture',
  },
  {
    name: 'picture_rail',
    lightmapTextureName: 'lightmap_4_texture',
  },
  {
    name: 'poster',
    lightmapTextureName: 'lightmap_4_texture',
    alphaBlendDisabled: true,
  },
  {
    name: 'sword',
    lightmapTextureName: 'lightmap_4_texture',
  },
  {
    name: 'typewriter',
    lightmapTextureName: 'lightmap_4_texture',
  },
  {
    name: 'vase',
    lightmapTextureName: 'lightmap_4_texture',
  },
  {
    name: 'decal_common',
    lightmapTextureName: 'lightmap_5_texture',
    alphaBlendDisabled: true, // Avoid unnatural specular caused by angles.
    // zOffset: -0.1,
  },
  {
    name: 'decal_spiderweb',
    lightmapTextureName: 'lightmap_5_texture',
    // zOffset: -0.3,
  },
  {
    name: 'lamp_shade_1',
    emissiveIntensity: 6.0,
    alphaDisabled: true,
  },
  {
    name: 'lamp_shade_2',
    emissiveIntensity: 7.2,
    alphaDisabled: true,
  },
  {
    name: 'lamp_shade_3',
    emissiveIntensity: 5.2,
    alphaDisabled: true,
  },
  {
    name: 'lamp_shade_4',
    emissiveIntensity: 5.8,
    alphaDisabled: true,
  },
  {
    name: 'lamp_shade_5',
    emissiveIntensity: 6.8,
    alphaDisabled: true,
  },
  {
    name: 'table_lamp_shade',
    emissiveIntensity: 1.8,
    alphaDisabled: true,
  },
  {
    name: 'window_glass',
    refractionTextureName: 'environment_outdoor_texture',
    emissiveIntensity: 0.25,
    emissiveColorHex: '#95aeff',
    fogEnabled: false,
    zOffset: 0.1, // Avoid z-fighting.
  },
  {
    name: 'hallway_ceiling_center',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_ceiling_edge',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_cornice',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_decal_common',
    lightmapTextureName: 'lightmap_hallway_texture',
    alphaBlendDisabled: true,
  },
  {
    name: 'hallway_decal_spiderweb',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_door',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_floor_center',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_floor_edge',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_floor_gate',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_lamp_base',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_lamp_shade_off',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_wainscot',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_pillar',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_wall',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_lamp_shade',
    emissiveIntensity: 6.8,
    alphaDisabled: true,
  },
];

function getMaterialConfig(name: string) {
  return materialConfigs.find((config) => config.name === name);
}

export const meshConfigs: MeshConfigs = [
  {
    name: 'ceiling_1_center',
    effectiveLightNames: ['floor_1_light', 'stairs_light'],
    parentNodeName: 'room_meshes',
    animation: {
      targetProperty: 'material.lightmapTexture.level', // Affects all materials that use the same lightmap.
      ...createAnimationConfig('flickerVerySlowGentle', 1.0, 10),
    },
  },
  {
    name: 'ceiling_1_edge',
    effectiveLightNames: ['floor_1_light', 'stairs_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'ceiling_2_center',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'ceiling_2_edge',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'cornice_1',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'cornice_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'floor_1_center',
    effectiveLightNames: ['window_right_light', 'floor_1_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'floor_1_edge',
    effectiveLightNames: ['window_right_light', 'floor_1_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'floor_1_gate',
    effectiveLightNames: ['window_right_light', 'floor_1_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'floor_1_medallion',
    effectiveLightNames: ['window_right_light', 'floor_1_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'floor_2_center',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'floor_2_light',
    ],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'floor_2_edge',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'floor_2_light',
    ],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'floor_2_gate',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'floor_2_light',
    ],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'floor_2_medallion',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'floor_2_light',
    ],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'wainscot_1',
    effectiveLightNames: ['window_composite_light', 'top_left_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'wainscot_2',
    effectiveLightNames: ['window_composite_light', 'top_right_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'wall_room_1',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'wall_room_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'wall_stairs',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'door_1',
    effectiveLightNames: ['floor_1_light', 'door_1_light'],
    parentNodeName: 'room_meshes',
    animation: {
      targetProperty: 'material.lightmapTexture.level', // Affects all materials that use the same lightmap.
      ...createAnimationConfig('flickerVerySlowGentle', 1.0, 10),
    },
  },
  {
    name: 'door_2',
    effectiveLightNames: ['floor_2_light', 'door_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'lamp_base_back_1',
    effectiveLightNames: ['lamp_center_1_light', 'window_composite_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'lamp_base_back_2',
    effectiveLightNames: ['lamp_center_2_light', 'window_composite_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'lamp_base_center_1',
    effectiveLightNames: ['lamp_center_1_light', 'floor_1_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'lamp_base_center_2',
    effectiveLightNames: ['lamp_center_2_light', 'floor_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'lamp_base_front_1',
    effectiveLightNames: ['lamp_front_1_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'lamp_base_front_2',
    effectiveLightNames: ['lamp_front_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'lamp_base_stairs',
    effectiveLightNames: ['window_composite_light', 'room_composite_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'lamp_shade_off',
    effectiveLightNames: ['window_composite_light', 'room_composite_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'pillar_1',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'pillar_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'railing_baluster',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'railing_base',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'railing_handrail',
    effectiveLightNames: ['window_composite_light', 'top_right_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'railing_newel',
    effectiveLightNames: ['window_composite_light', 'top_right_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'stairs_back',
    effectiveLightNames: ['stairs_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'stairs_landing',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'stairs_steps',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'window_frame',
    effectiveLightNames: ['window_sun_light', 'room_composite_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'bookshelf',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'room_meshes',
    animation: {
      targetProperty: 'material.lightmapTexture.level', // Affects all materials that use the same lightmap.
      ...createAnimationConfig('flickerVerySlowGentle', 1.0, 10),
    },
  },
  {
    name: 'buffet_1',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'buffet_2',
    effectiveLightNames: ['window_composite_light', 'mirror_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'buffet_stairs',
    effectiveLightNames: ['window_composite_light', 'stairs_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'library_table',
    effectiveLightNames: ['window_composite_light', 'table_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'library_table_stairs',
    effectiveLightNames: ['window_composite_light', 'stairs_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'chair_1',
    effectiveLightNames: ['window_inner_light', 'table_light'],
    parentNodeName: 'room_meshes',
    animation: {
      targetProperty: 'material.lightmapTexture.level', // Affects all materials that use the same lightmap.
      ...createAnimationConfig('flickerVerySlowGentle', 1.0, 10),
    },
  },
  {
    name: 'chair_2',
    effectiveLightNames: ['window_inner_light', 'chair_front_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'chair_stairs',
    effectiveLightNames: ['window_composite_light', 'stairs_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'clock',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'console_table',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'console_table_stairs',
    effectiveLightNames: ['window_composite_light', 'stairs_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'corner_cabinet_1',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'corner_cabinet_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'picture_canvas_1',
    effectiveLightNames: ['window_composite_light', 'table_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'picture_canvas_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'picture_frame_black_1',
    effectiveLightNames: ['window_composite_light', 'table_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'picture_frame_black_2',
    effectiveLightNames: ['window_distant_light', 'floor_2_distant_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'picture_frame_gold_2',
    effectiveLightNames: ['window_distant_light', 'floor_2_distant_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'picture_frame_silver_2',
    effectiveLightNames: ['window_distant_light', 'floor_2_distant_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'signboard',
    effectiveLightNames: ['signboard_left_light', 'signboard_right_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'table_lamp_base',
    effectiveLightNames: ['lamp_center_1_light', 'top_left_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'book',
    effectiveLightNames: ['table_light', 'top_right_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'bottle_1',
    effectiveLightNames: ['window_composite_light', 'top_left_light'],
    parentNodeName: 'room_meshes',
    animation: {
      targetProperty: 'material.lightmapTexture.level', // Affects all materials that use the same lightmap.
      ...createAnimationConfig('flickerVerySlowGentle', 1.0, 10),
    },
  },
  {
    name: 'bottle_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'box_1',
    effectiveLightNames: ['window_composite_light', 'top_left_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'box_2',
    effectiveLightNames: ['window_right_light', 'top_right_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'box_stairs',
    effectiveLightNames: ['window_composite_light', 'stairs_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'cat',
    effectiveLightNames: ['window_distant_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'cat_cloth',
    effectiveLightNames: ['window_distant_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'globe',
    effectiveLightNames: ['window_composite_light', 'mirror_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'lantern_1',
    effectiveLightNames: ['window_composite_light', 'top_left_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'lantern_2',
    effectiveLightNames: ['window_composite_light', 'top_right_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'mirror_frame',
    effectiveLightNames: ['window_composite_light', 'mirror_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'mirror_surface',
    effectiveLightNames: [],
    parentNodeName: 'room_meshes',
    animation: {
      targetProperty: 'material.environmentIntensity',
      ...createAnimationConfig('flickerVerySlowGentle', 1.0, 15),
    },
  },
  {
    name: 'phonograph',
    effectiveLightNames: ['window_composite_light', 'phonograph_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'phonograph_arm',
    effectiveLightNames: ['window_composite_light', 'phonograph_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'phonograph_disk',
    effectiveLightNames: ['window_composite_light', 'phonograph_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'picture_rail_1',
    effectiveLightNames: ['window_composite_light', 'table_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'picture_rail_2',
    effectiveLightNames: ['window_composite_light', 'chair_front_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'poster',
    effectiveLightNames: ['floor_1_light', 'table_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'sword',
    effectiveLightNames: ['window_composite_light', 'sword_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'typewriter',
    effectiveLightNames: ['table_light', 'top_right_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'typewriter_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'vase',
    effectiveLightNames: ['window_composite_light', 'top_left_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'decal_spiderweb',
    effectiveLightNames: [],
    parentNodeName: 'room_meshes',
    animation: {
      targetProperty: 'material.lightmapTexture.level', // Affects all materials that use the same lightmap.
      ...createAnimationConfig('flickerVerySlowGentle', 1.0, 10),
    },
  },
  {
    name: 'decal_floor_1',
    effectiveLightNames: ['window_right_light', 'floor_1_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'decal_floor_2',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'floor_2_light',
    ],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'decal_wall_1',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'decal_wall_2',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'lamp_shade_1',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'room_meshes',
    animation: {
      targetProperty: 'material.emissiveIntensity',
      ...createAnimationConfig(
        'flickerMedium',
        getMaterialConfig('lamp_shade_1')?.emissiveIntensity || 0,
        15,
      ),
    },
  },
  {
    name: 'lamp_shade_2',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'room_meshes',
    animation: {
      targetProperty: 'material.emissiveIntensity',
      ...createAnimationConfig(
        'flickerFast',
        getMaterialConfig('lamp_shade_2')?.emissiveIntensity || 0,
        15,
      ),
    },
  },
  {
    name: 'lamp_shade_3',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'room_meshes',
    animation: {
      targetProperty: 'material.emissiveIntensity',
      ...createAnimationConfig(
        'flickerSlow',
        getMaterialConfig('lamp_shade_3')?.emissiveIntensity || 0,
        15,
      ),
    },
  },
  {
    name: 'lamp_shade_4',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'room_meshes',
    animation: {
      targetProperty: 'material.emissiveIntensity',
      ...createAnimationConfig(
        'flickerSlow',
        getMaterialConfig('lamp_shade_4')?.emissiveIntensity || 0,
        15,
      ),
    },
  },
  {
    name: 'lamp_shade_5',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'room_meshes',
    animation: {
      targetProperty: 'material.emissiveIntensity',
      ...createAnimationConfig(
        'flickerFast',
        getMaterialConfig('lamp_shade_5')?.emissiveIntensity || 0,
        15,
      ),
    },
  },
  {
    name: 'table_lamp_shade',
    effectiveLightNames: [],
    parentNodeName: 'room_meshes',
    animation: {
      targetProperty: 'material.emissiveIntensity',
      ...createAnimationConfig(
        'flickerVeryFast',
        getMaterialConfig('table_lamp_shade')?.emissiveIntensity || 0,
        15,
      ),
    },
  },
  {
    name: 'window_glass',
    effectiveLightNames: [],
    parentNodeName: 'room_meshes',
    animation: {
      targetProperty: 'material.emissiveIntensity',
      ...createAnimationConfig(
        'flickerVerySlow',
        getMaterialConfig('window_glass')?.emissiveIntensity || 0,
        15,
      ),
    },
  },
  {
    name: 'hallway_ceiling_center',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
    animation: {
      targetProperty: 'material.lightmapTexture.level', // Affects all materials that use the same lightmap.
      ...createAnimationConfig('flickerVeryFastSlight', 1.0, 10),
    },
  },
  {
    name: 'hallway_ceiling_edge',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'hallway_cornice',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'hallway_decal_spiderweb',
    effectiveLightNames: [], // Avoid unexpected specular and z-fighting.
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'hallway_decal_wall',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'hallway_door_front',
    effectiveLightNames: ['hallway_front_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'hallway_door_back',
    effectiveLightNames: ['hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'hallway_floor_center',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'hallway_floor_edge',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'hallway_floor_gate',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'hallway_lamp_base_front',
    effectiveLightNames: ['hallway_lamp_front_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'hallway_lamp_base_back',
    effectiveLightNames: ['hallway_lamp_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'hallway_lamp_base_side',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'hallway_lamp_shade_off',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'hallway_pillar',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'hallway_wainscot',
    effectiveLightNames: [
      'hallway_top_right_light',
      'hallway_front_light',
      'hallway_back_light',
    ],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'hallway_wall',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'hallway_lamp_shade',
    effectiveLightNames: [],
    parentNodeName: 'hallway_meshes',
    animation: {
      targetProperty: 'material.emissiveIntensity',
      ...createAnimationConfig(
        'flickerVeryFastGentle',
        getMaterialConfig('hallway_lamp_shade')?.emissiveIntensity || 0,
        15,
      ),
    },
  },
];

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
    intensity: 0.08,
    diffuseColorHex: '#ffeed3',
    radius: 0.1,
    parentNodeName: 'room',
    animation: {
      targetProperty: 'intensity',
      ...createAnimationConfig('flickerFast', 0.08, 30),
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
