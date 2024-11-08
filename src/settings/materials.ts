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
    name: 'signboard_front_1',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'signboard_front_2',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'signboard_front_3',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'signboard_front_4',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'signboard_front_5',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'signboard_front_6',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'signboard_front_7',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'signboard_front_8',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'signboard_front_9',
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
    animation: {
      targetProperty: 'environmentIntensity',
      ...createAnimationConfig('flickerVerySlowGentle', 1.0, 15),
    },
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
    name: 'lamp_shade_1',
    emissiveIntensity: 6.0,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerMedium', 6.0, 15),
    },
  },
  {
    name: 'lamp_shade_2',
    emissiveIntensity: 7.2,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerFast', 7.2, 15),
    },
  },
  {
    name: 'lamp_shade_3',
    emissiveIntensity: 5.2,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerSlow', 5.2, 15),
    },
  },
  {
    name: 'lamp_shade_4',
    emissiveIntensity: 5.8,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerSlow', 5.8, 15),
    },
  },
  {
    name: 'lamp_shade_5',
    emissiveIntensity: 6.8,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerFast', 6.8, 15),
    },
  },
  {
    name: 'table_lamp_shade',
    emissiveIntensity: 1.8,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerVeryFast', 1.8, 15),
    },
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
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerVeryFastGentle', 6.8, 15),
    },
  },
];
