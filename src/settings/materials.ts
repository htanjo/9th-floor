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
  // Lightmap 01: wall ==============================================
  {
    name: 'cornice',
    lightmapTextureName: 'lightmap_01_texture',
  },
  {
    name: 'cornice_hallway',
    lightmapTextureName: 'lightmap_01_texture',
  },
  {
    name: 'decal_wall',
    lightmapTextureName: 'lightmap_01_texture',
    alphaBlendDisabled: true, // Avoid unnatural specular according to angles.
    // zOffset: -0.1,
  },
  {
    name: 'decal_wall_hallway',
    lightmapTextureName: 'lightmap_01_texture',
    alphaBlendDisabled: true, // Avoid unnatural specular according to angles.
    // zOffset: -0.1,
  },
  {
    name: 'decal_spiderweb',
    lightmapTextureName: 'lightmap_01_texture',
    alphaBlendDisabled: false, // Enable accurate alpha blending.
  },
  {
    name: 'decal_spiderweb_hallway',
    lightmapTextureName: 'lightmap_01_texture',
    alphaBlendDisabled: false, // Enable accurate alpha blending.
  },
  {
    name: 'wainscot',
    lightmapTextureName: 'lightmap_01_texture',
  },
  {
    name: 'wainscot_hallway',
    lightmapTextureName: 'lightmap_01_texture',
  },
  {
    name: 'wall',
    lightmapTextureName: 'lightmap_01_texture',
  },
  {
    name: 'wall_hallway',
    lightmapTextureName: 'lightmap_01_texture',
  },
  {
    name: 'wall_stairs',
    lightmapTextureName: 'lightmap_01_texture',
  },

  // Lightmap 02: ceiling, floor ====================================
  {
    name: 'ceiling_center',
    lightmapTextureName: 'lightmap_02_texture',
  },
  {
    name: 'ceiling_center_hallway',
    lightmapTextureName: 'lightmap_02_texture',
  },
  {
    name: 'ceiling_edge',
    lightmapTextureName: 'lightmap_02_texture',
  },
  {
    name: 'ceiling_edge_hallway',
    lightmapTextureName: 'lightmap_02_texture',
  },
  {
    name: 'decal_floor',
    lightmapTextureName: 'lightmap_02_texture',
    alphaBlendDisabled: true, // Avoid unnatural specular according to angles.
    // zOffset: -0.1,
  },
  {
    name: 'floor_center',
    lightmapTextureName: 'lightmap_02_texture',
  },
  {
    name: 'floor_center_hallway',
    lightmapTextureName: 'lightmap_02_texture',
  },
  {
    name: 'floor_edge',
    lightmapTextureName: 'lightmap_02_texture',
  },
  {
    name: 'floor_edge_hallway',
    lightmapTextureName: 'lightmap_02_texture',
  },
  {
    name: 'floor_gate',
    lightmapTextureName: 'lightmap_02_texture',
  },
  {
    name: 'floor_gate_hallway',
    lightmapTextureName: 'lightmap_02_texture',
  },
  {
    name: 'floor_medallion',
    lightmapTextureName: 'lightmap_02_texture',
  },
  {
    name: 'stairs_back',
    lightmapTextureName: 'lightmap_02_texture',
  },
  {
    name: 'stairs_landing',
    lightmapTextureName: 'lightmap_02_texture',
  },

  // Lightmap 03: large interior ====================================
  {
    name: 'door',
    lightmapTextureName: 'lightmap_03_texture',
  },
  {
    name: 'door_hallway',
    lightmapTextureName: 'lightmap_03_texture',
  },
  {
    name: 'pillar',
    lightmapTextureName: 'lightmap_03_texture',
  },
  {
    name: 'pillar_hallway',
    lightmapTextureName: 'lightmap_03_texture',
  },
  {
    name: 'window_frame',
    lightmapTextureName: 'lightmap_03_texture',
  },

  // Lightmap 04: small interior ====================================
  {
    name: 'lamp_base',
    lightmapTextureName: 'lightmap_04_texture',
  },
  {
    name: 'lamp_base_hallway',
    lightmapTextureName: 'lightmap_04_texture',
  },
  {
    name: 'lamp_shade_off',
    lightmapTextureName: 'lightmap_04_texture',
  },
  {
    name: 'lamp_shade_off_hallway',
    lightmapTextureName: 'lightmap_04_texture',
  },
  {
    name: 'railing_baluster',
    lightmapTextureName: 'lightmap_04_texture',
  },
  {
    name: 'railing_base',
    lightmapTextureName: 'lightmap_04_texture',
  },
  {
    name: 'railing_handrail',
    lightmapTextureName: 'lightmap_04_texture',
  },
  {
    name: 'railing_newel',
    lightmapTextureName: 'lightmap_04_texture',
  },
  {
    name: 'stairs_steps',
    lightmapTextureName: 'lightmap_04_texture',
  },

  // Lightmap 05: large furniture ===================================
  {
    name: 'library_table',
    lightmapTextureName: 'lightmap_05_texture',
  },
  {
    name: 'bookshelf',
    lightmapTextureName: 'lightmap_05_texture',
  },

  // Lightmap 06: small furniture ===================================
  {
    name: 'buffet',
    lightmapTextureName: 'lightmap_06_texture',
  },
  {
    name: 'chair',
    lightmapTextureName: 'lightmap_06_texture',
  },
  {
    name: 'clock',
    lightmapTextureName: 'lightmap_06_texture',
  },
  {
    name: 'console_table',
    lightmapTextureName: 'lightmap_06_texture',
  },
  {
    name: 'corner_cabinet',
    lightmapTextureName: 'lightmap_06_texture',
  },

  // Lightmap 07: hanging object ====================================
  {
    name: 'mirror_frame',
    lightmapTextureName: 'lightmap_07_texture',
  },
  {
    name: 'mirror_surface',
    lightmapTextureName: 'lightmap_07_texture',
    reflectionTextureName: 'environment_mirror_texture',
    animation: {
      targetProperty: 'environmentIntensity',
      ...createAnimationConfig('flickerVerySlowGentle', 1.0, 15),
    },
  },
  {
    name: 'picture_canvas',
    lightmapTextureName: 'lightmap_07_texture',
  },
  {
    name: 'picture_frame_black',
    lightmapTextureName: 'lightmap_07_texture',
  },
  {
    name: 'picture_frame_gold',
    lightmapTextureName: 'lightmap_07_texture',
  },
  {
    name: 'picture_frame_silver',
    lightmapTextureName: 'lightmap_07_texture',
  },
  {
    name: 'picture_rail',
    lightmapTextureName: 'lightmap_07_texture',
  },
  {
    name: 'poster',
    lightmapTextureName: 'lightmap_07_texture',
    alphaBlendDisabled: true,
  },
  {
    name: 'signboard_base',
    lightmapTextureName: 'lightmap_07_texture',
  },
  {
    name: 'signboard_front_1',
    lightmapTextureName: 'lightmap_07_texture',
  },
  {
    name: 'signboard_front_2',
    lightmapTextureName: 'lightmap_07_texture',
  },
  {
    name: 'signboard_front_3',
    lightmapTextureName: 'lightmap_07_texture',
  },
  {
    name: 'signboard_front_4',
    lightmapTextureName: 'lightmap_07_texture',
  },
  {
    name: 'signboard_front_5',
    lightmapTextureName: 'lightmap_07_texture',
  },
  {
    name: 'signboard_front_6',
    lightmapTextureName: 'lightmap_07_texture',
  },
  {
    name: 'signboard_front_7',
    lightmapTextureName: 'lightmap_07_texture',
  },
  {
    name: 'signboard_front_8',
    lightmapTextureName: 'lightmap_07_texture',
  },
  {
    name: 'signboard_front_9',
    lightmapTextureName: 'lightmap_07_texture',
  },
  {
    name: 'sword',
    lightmapTextureName: 'lightmap_07_texture',
  },

  // Lightmap 08: Large object ======================================
  {
    name: 'book',
    lightmapTextureName: 'lightmap_08_texture',
  },

  // Lightmap 09: Small object ======================================

  {
    name: 'bottle',
    lightmapTextureName: 'lightmap_09_texture',
  },
  {
    name: 'box',
    lightmapTextureName: 'lightmap_09_texture',
  },
  {
    name: 'cat',
    lightmapTextureName: 'lightmap_09_texture',
  },
  {
    name: 'cloth',
    lightmapTextureName: 'lightmap_09_texture',
  },
  {
    name: 'globe',
    lightmapTextureName: 'lightmap_09_texture',
  },
  {
    name: 'lantern',
    lightmapTextureName: 'lightmap_09_texture',
  },
  {
    name: 'phonograph',
    lightmapTextureName: 'lightmap_09_texture',
  },
  {
    name: 'stationery',
    lightmapTextureName: 'lightmap_09_texture',
  },
  {
    name: 'table_lamp_base',
    lightmapTextureName: 'lightmap_09_texture',
  },
  {
    name: 'vase',
    lightmapTextureName: 'lightmap_09_texture',
  },

  // Lightmap 10: anomaly ===========================================
  {
    name: 'chair_outside_anomaly',
    lightmapTextureName: 'lightmap_10_texture',
  },
  {
    name: 'picture_canvas_anomaly',
    lightmapTextureName: 'lightmap_10_texture',
  },
  {
    name: 'sword_anomaly',
    lightmapTextureName: 'lightmap_10_texture',
  },

  // Lightmap none ==================================================
  {
    name: 'lamp_shade_back_left',
    emissiveIntensity: 5.8,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerSlow', 5.8, 15),
    },
  },
  {
    name: 'lamp_shade_back_right',
    emissiveIntensity: 6.8,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerFast', 6.8, 15),
    },
  },
  {
    name: 'lamp_shade_center_left',
    emissiveIntensity: 7.2,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerFast', 7.2, 15),
    },
  },
  {
    name: 'lamp_shade_center_right',
    emissiveIntensity: 5.2,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerSlow', 5.2, 15),
    },
  },
  {
    name: 'lamp_shade_front',
    emissiveIntensity: 6.0,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerMedium', 6.0, 15),
    },
  },
  {
    name: 'lamp_shade_hallway',
    emissiveIntensity: 6.8,
    alphaDisabled: true,
    animation: {
      targetProperty: 'emissiveIntensity',
      ...createAnimationConfig('flickerVeryFastGentle', 6.8, 15),
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
    name: 'chair_outside_shadow_anomaly',
    // zOffset: -0.1,
  },
  {
    name: 'floor_none_anomaly',
  },
];
