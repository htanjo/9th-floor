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
  animation?: {
    targetProperty: string;
  } & AnimationConfig;
}

export type MaterialConfigs = MaterialConfig[];

export const materialConfigs: MaterialConfigs = [
  {
    name: 'ceiling_center_upper',
    lightmapTextureName: 'lightmap_upper_1_texture',
  },
  {
    name: 'ceiling_edge_upper',
    lightmapTextureName: 'lightmap_upper_1_texture',
  },
  {
    name: 'cornice_upper',
    lightmapTextureName: 'lightmap_upper_1_texture',
  },
  {
    name: 'floor_center_upper',
    lightmapTextureName: 'lightmap_upper_1_texture',
  },
  {
    name: 'floor_edge_upper',
    lightmapTextureName: 'lightmap_upper_1_texture',
  },
  {
    name: 'floor_gate_upper',
    lightmapTextureName: 'lightmap_upper_1_texture',
  },
  {
    name: 'floor_medallion_upper',
    lightmapTextureName: 'lightmap_upper_1_texture',
  },
  {
    name: 'wainscot_upper',
    lightmapTextureName: 'lightmap_upper_1_texture',
  },
  {
    name: 'wall_upper',
    lightmapTextureName: 'lightmap_upper_1_texture',
  },
  {
    name: 'door_upper',
    lightmapTextureName: 'lightmap_upper_2_texture',
  },
  {
    name: 'lamp_base_upper',
    lightmapTextureName: 'lightmap_upper_2_texture',
  },
  {
    name: 'pillar_upper',
    lightmapTextureName: 'lightmap_upper_2_texture',
  },
  {
    name: 'buffet_upper',
    lightmapTextureName: 'lightmap_upper_3_texture',
  },
  {
    name: 'chair_upper',
    lightmapTextureName: 'lightmap_upper_3_texture',
  },
  {
    name: 'console_table_upper',
    lightmapTextureName: 'lightmap_upper_3_texture',
  },
  {
    name: 'corner_cabinet_upper',
    lightmapTextureName: 'lightmap_upper_3_texture',
  },
  {
    name: 'mirror_frame_upper',
    lightmapTextureName: 'lightmap_upper_4_texture',
  },
  {
    name: 'mirror_surface_upper',
    lightmapTextureName: 'lightmap_upper_4_texture',
    reflectionTextureName: 'environment_mirror_texture',
    animation: {
      targetProperty: 'environmentIntensity',
      ...createAnimationConfig('flickerVerySlowGentle', 1.0, 15),
    },
  },
  {
    name: 'picture_canvas_upper',
    lightmapTextureName: 'lightmap_upper_4_texture',
  },
  {
    name: 'picture_frame_black_upper',
    lightmapTextureName: 'lightmap_upper_4_texture',
  },
  {
    name: 'picture_frame_gold_upper',
    lightmapTextureName: 'lightmap_upper_4_texture',
  },
  {
    name: 'picture_frame_silver_upper',
    lightmapTextureName: 'lightmap_upper_4_texture',
  },
  {
    name: 'picture_rail_upper',
    lightmapTextureName: 'lightmap_upper_4_texture',
  },
  {
    name: 'signboard_base_upper',
    lightmapTextureName: 'lightmap_upper_4_texture',
  },
  {
    name: 'signboard_front_1_upper',
    lightmapTextureName: 'lightmap_upper_4_texture',
  },
  {
    name: 'signboard_front_2_upper',
    lightmapTextureName: 'lightmap_upper_4_texture',
  },
  {
    name: 'signboard_front_3_upper',
    lightmapTextureName: 'lightmap_upper_4_texture',
  },
  {
    name: 'signboard_front_4_upper',
    lightmapTextureName: 'lightmap_upper_4_texture',
  },
  {
    name: 'signboard_front_5_upper',
    lightmapTextureName: 'lightmap_upper_4_texture',
  },
  {
    name: 'signboard_front_6_upper',
    lightmapTextureName: 'lightmap_upper_4_texture',
  },
  {
    name: 'signboard_front_7_upper',
    lightmapTextureName: 'lightmap_upper_4_texture',
  },
  {
    name: 'signboard_front_8_upper',
    lightmapTextureName: 'lightmap_upper_4_texture',
  },
  {
    name: 'signboard_front_9_upper',
    lightmapTextureName: 'lightmap_upper_4_texture',
  },
  {
    name: 'sword_upper',
    lightmapTextureName: 'lightmap_upper_4_texture',
  },
  {
    name: 'bottle_upper',
    lightmapTextureName: 'lightmap_upper_5_texture',
  },
  {
    name: 'box_upper',
    lightmapTextureName: 'lightmap_upper_5_texture',
  },
  {
    name: 'globe_upper',
    lightmapTextureName: 'lightmap_upper_5_texture',
  },
  {
    name: 'lantern_upper',
    lightmapTextureName: 'lightmap_upper_5_texture',
  },
  {
    name: 'phonograph_upper',
    lightmapTextureName: 'lightmap_upper_5_texture',
  },
  {
    name: 'stationery_upper',
    lightmapTextureName: 'lightmap_upper_5_texture',
  },
  {
    name: 'vase_upper',
    lightmapTextureName: 'lightmap_upper_5_texture',
  },
  {
    name: 'decal_upper',
    lightmapTextureName: 'lightmap_upper_6_texture',
    alphaBlendDisabled: true, // Avoid unnatural specular according to angles.
    // zOffset: -0.1,
  },
  {
    name: 'lamp_shade_back_left_upper',
    emissiveIntensity: 5.8,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerSlow', 5.8, 15),
    },
  },
  {
    name: 'lamp_shade_back_right_upper',
    emissiveIntensity: 6.8,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerFast', 6.8, 15),
    },
  },
  {
    name: 'lamp_shade_center_left_upper',
    emissiveIntensity: 7.2,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerFast', 7.2, 15),
    },
  },
  {
    name: 'lamp_shade_center_right_upper',
    emissiveIntensity: 5.2,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerSlow', 5.2, 15),
    },
  },
  {
    name: 'lamp_shade_front_upper',
    emissiveIntensity: 6.0,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerMedium', 6.0, 15),
    },
  },
  {
    name: 'ceiling_center_lower',
    lightmapTextureName: 'lightmap_lower_1_texture',
  },
  {
    name: 'ceiling_edge_lower',
    lightmapTextureName: 'lightmap_lower_1_texture',
  },
  {
    name: 'cornice_lower',
    lightmapTextureName: 'lightmap_lower_1_texture',
  },
  {
    name: 'floor_center_lower',
    lightmapTextureName: 'lightmap_lower_1_texture',
  },
  {
    name: 'floor_edge_lower',
    lightmapTextureName: 'lightmap_lower_1_texture',
  },
  {
    name: 'floor_gate_lower',
    lightmapTextureName: 'lightmap_lower_1_texture',
  },
  {
    name: 'floor_medallion_lower',
    lightmapTextureName: 'lightmap_lower_1_texture',
  },
  {
    name: 'wainscot_lower',
    lightmapTextureName: 'lightmap_lower_1_texture',
  },
  {
    name: 'wall_lower',
    lightmapTextureName: 'lightmap_lower_1_texture',
  },
  {
    name: 'door_lower',
    lightmapTextureName: 'lightmap_lower_2_texture',
  },
  {
    name: 'lamp_base_lower',
    lightmapTextureName: 'lightmap_lower_2_texture',
  },
  {
    name: 'pillar_lower',
    lightmapTextureName: 'lightmap_lower_2_texture',
  },
  {
    name: 'buffet_lower',
    lightmapTextureName: 'lightmap_lower_3_texture',
  },
  {
    name: 'chair_lower',
    lightmapTextureName: 'lightmap_lower_3_texture',
  },
  {
    name: 'clock_lower',
    lightmapTextureName: 'lightmap_lower_3_texture',
  },
  {
    name: 'console_table_lower',
    lightmapTextureName: 'lightmap_lower_3_texture',
  },
  {
    name: 'corner_cabinet_lower',
    lightmapTextureName: 'lightmap_lower_3_texture',
  },
  {
    name: 'library_table_lower',
    lightmapTextureName: 'lightmap_lower_3_texture',
  },
  {
    name: 'bookshelf_lower',
    lightmapTextureName: 'lightmap_lower_4_texture',
  },
  {
    name: 'picture_canvas_lower',
    lightmapTextureName: 'lightmap_lower_5_texture',
  },
  {
    name: 'picture_frame_black_lower',
    lightmapTextureName: 'lightmap_lower_5_texture',
  },
  {
    name: 'picture_rail_lower',
    lightmapTextureName: 'lightmap_lower_5_texture',
  },
  {
    name: 'poster_lower',
    lightmapTextureName: 'lightmap_lower_5_texture',
    alphaBlendDisabled: true,
  },
  {
    name: 'book_lower',
    lightmapTextureName: 'lightmap_lower_6_texture',
  },
  {
    name: 'bottle_lower',
    lightmapTextureName: 'lightmap_lower_6_texture',
  },
  {
    name: 'box_lower',
    lightmapTextureName: 'lightmap_lower_6_texture',
  },
  {
    name: 'cloth_lower',
    lightmapTextureName: 'lightmap_lower_6_texture',
  },
  {
    name: 'lantern_lower',
    lightmapTextureName: 'lightmap_lower_6_texture',
  },
  {
    name: 'table_lamp_base_lower',
    lightmapTextureName: 'lightmap_lower_6_texture',
  },
  {
    name: 'stationery_lower',
    lightmapTextureName: 'lightmap_lower_6_texture',
  },
  {
    name: 'decal_lower',
    lightmapTextureName: 'lightmap_lower_7_texture',
    alphaBlendDisabled: true, // Avoid unnatural specular according to angles.
    // zOffset: -0.1,
  },
  {
    name: 'lamp_shade_front_lower',
    emissiveIntensity: 6.0,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerMedium', 6.0, 15),
    },
  },
  {
    name: 'lamp_shade_center_left_lower',
    emissiveIntensity: 7.2,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerFast', 7.2, 15),
    },
  },
  {
    name: 'lamp_shade_center_right_lower',
    emissiveIntensity: 5.2,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerSlow', 5.2, 15),
    },
  },
  {
    name: 'lamp_shade_back_left_lower',
    emissiveIntensity: 5.8,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerSlow', 5.8, 15),
    },
  },
  {
    name: 'lamp_shade_back_right_lower',
    emissiveIntensity: 6.8,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerFast', 6.8, 15),
    },
  },
  {
    name: 'table_lamp_shade_lower',
    emissiveIntensity: 1.8,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerVeryFast', 1.8, 15),
    },
  },

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
    name: 'wainscot',
    lightmapTextureName: 'lightmap_1_texture',
  },
  {
    name: 'wall_stairs',
    lightmapTextureName: 'lightmap_1_texture',
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
    name: 'buffet',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'chair',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'console_table',
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
    name: 'picture_rail',
    lightmapTextureName: 'lightmap_4_texture',
  },
  {
    name: 'decal_common',
    lightmapTextureName: 'lightmap_5_texture',
    alphaBlendDisabled: true, // Avoid unnatural specular according to angles.
    // zOffset: -0.1,
  },
  {
    name: 'decal_spiderweb',
    lightmapTextureName: 'lightmap_5_texture',
    // zOffset: -0.3,
  },
  {
    name: 'chair_anomaly',
    lightmapTextureName: 'lightmap_anomaly_texture',
  },
  {
    name: 'picture_canvas_anomaly',
    lightmapTextureName: 'lightmap_anomaly_texture',
  },
  {
    name: 'sword_anomaly',
    lightmapTextureName: 'lightmap_anomaly_texture',
  },
  {
    name: 'window_glass',
    refractionTextureName: 'environment_outdoor_texture',
    emissiveIntensity: 0.25,
    emissiveColorHex: '#95aeff',
    fogEnabled: false,
    zOffset: 0.1, // Avoid z-fighting.
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerVerySlow', 0.25, 15),
    },
  },
  {
    name: 'anomaly_shadow',
    zOffset: -0.1,
  },
  {
    name: 'floor_none_anomaly',
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
    name: 'hallway_decal',
    lightmapTextureName: 'lightmap_hallway_texture',
    alphaBlendDisabled: true,
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
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerVeryFastGentle', 6.8, 15),
    },
  },
];
