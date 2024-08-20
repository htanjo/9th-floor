export interface MaterialConfig {
  name: string;
  lightmapTextureName?: string;
  refractionTextureName?: string;
  directIntensity?: number;
  emissiveColorHex?: string;
  emissiveIntensity?: number;
  fogEnabled?: boolean;
  zOffset?: number;
}

export type MaterialConfigs = MaterialConfig[];

export interface MeshConfig {
  name: string;
  effectiveLightNames: string[];
}

export type MeshConfigs = MeshConfig[];

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
    name: 'floor_center',
    lightmapTextureName: 'lightmap_1_texture',
  },
  {
    name: 'floor_edge',
    lightmapTextureName: 'lightmap_1_texture',
  },
  {
    name: 'wall',
    lightmapTextureName: 'lightmap_1_texture',
  },
  {
    name: 'stairs_back',
    lightmapTextureName: 'lightmap_2_texture',
  },
  {
    name: 'stairs_base',
    lightmapTextureName: 'lightmap_2_texture',
  },
  {
    name: 'stairs_runner',
    lightmapTextureName: 'lightmap_2_texture',
  },
  {
    name: 'wood',
    lightmapTextureName: 'lightmap_2_texture',
  },
  {
    name: 'railing_baluster',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'railing_handrail',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'railing_newel',
    lightmapTextureName: 'lightmap_3_texture',
  },
  {
    name: 'cornice',
    lightmapTextureName: 'lightmap_4_texture',
  },
  {
    name: 'door',
    lightmapTextureName: 'lightmap_4_texture',
  },
  {
    name: 'pillar',
    lightmapTextureName: 'lightmap_4_texture',
  },
  {
    name: 'railing_base',
    lightmapTextureName: 'lightmap_4_texture',
  },
  {
    name: 'wainscot',
    lightmapTextureName: 'lightmap_4_texture',
  },
  {
    name: 'window_frame',
    lightmapTextureName: 'lightmap_4_texture',
    directIntensity: 0.2,
  },
  {
    name: 'lamp_base',
    lightmapTextureName: 'lightmap_5_texture',
  },
  {
    name: 'buffet',
    lightmapTextureName: 'lightmap_6_texture',
  },
  {
    name: 'chair',
    lightmapTextureName: 'lightmap_6_texture',
  },
  {
    name: 'console_table',
    lightmapTextureName: 'lightmap_6_texture',
  },
  {
    name: 'picture_canvas_1',
    lightmapTextureName: 'lightmap_6_texture',
  },
  {
    name: 'picture_canvas_2',
    lightmapTextureName: 'lightmap_6_texture',
  },
  {
    name: 'picture_canvas_3',
    lightmapTextureName: 'lightmap_6_texture',
  },
  {
    name: 'picture_canvas_4',
    lightmapTextureName: 'lightmap_6_texture',
  },
  {
    name: 'picture_canvas_5',
    lightmapTextureName: 'lightmap_6_texture',
  },
  {
    name: 'picture_canvas_6',
    lightmapTextureName: 'lightmap_6_texture',
  },
  {
    name: 'picture_frame',
    lightmapTextureName: 'lightmap_6_texture',
  },
  {
    name: 'vase',
    lightmapTextureName: 'lightmap_6_texture',
  },
  {
    name: 'lamp_shade',
    emissiveIntensity: 4,
  },
  {
    name: 'window_glass',
    refractionTextureName: 'environment_texture',
    emissiveColorHex: '#d1e3ff',
    emissiveIntensity: 0.5,
    fogEnabled: false,
    zOffset: 0.1, // Avoid z-fighting.
  },
  {
    name: 'hallway_ceiling',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_cornice',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_door',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_floor',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_lamp_base',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_wainscot',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_wall',
    lightmapTextureName: 'lightmap_hallway_texture',
  },
  {
    name: 'hallway_lamp_shade',
    emissiveIntensity: 3,
  },
];

export const meshConfigs: MeshConfigs = [
  {
    name: 'ceiling_1_center',
    effectiveLightNames: ['floor_1_light', 'stairs_light'],
  },
  {
    name: 'ceiling_1_edge',
    effectiveLightNames: ['floor_1_light', 'stairs_light'],
  },
  {
    name: 'ceiling_2_center',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
  },
  {
    name: 'ceiling_2_edge',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
  },
  {
    name: 'floor_1_center',
    effectiveLightNames: ['window_right_light', 'floor_1_light'],
  },
  {
    name: 'floor_1_edge',
    effectiveLightNames: ['window_right_light', 'floor_1_light'],
  },
  {
    name: 'floor_2_center',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'floor_2_light',
    ],
  },
  {
    name: 'floor_2_edge',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'floor_2_light',
    ],
  },
  {
    name: 'wall',
    effectiveLightNames: [
      'window_composite_light',
      'floor_1_light',
      'floor_2_light',
    ],
  },
  {
    name: 'signboard',
    effectiveLightNames: [
      'window_composite_light',
      'floor_2_light',
      'top_light',
    ],
  },
  {
    name: 'stairs_back',
    effectiveLightNames: ['stairs_light', 'top_light'],
  },
  {
    name: 'stairs_base',
    effectiveLightNames: [
      'window_composite_light',
      'stairs_light',
      'top_light',
    ],
  },
  {
    name: 'stairs_runner',
    effectiveLightNames: ['window_composite_light', 'top_light'],
  },
  {
    name: 'railing_baluster',
    effectiveLightNames: ['window_composite_light', 'top_light'],
  },
  {
    name: 'railing_handrail',
    effectiveLightNames: ['window_composite_light', 'top_light'],
  },
  {
    name: 'railing_newel',
    effectiveLightNames: ['window_composite_light', 'top_light'],
  },
  {
    name: 'cornice_1',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
  },
  {
    name: 'cornice_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
  },
  {
    name: 'door_1',
    effectiveLightNames: [
      'window_composite_light',
      'floor_1_light',
      'top_light',
      'hallway_front_light',
    ],
  },
  {
    name: 'door_2',
    effectiveLightNames: [
      'window_composite_light',
      'floor_2_light',
      'top_light',
      'hallway_front_light',
    ],
  },
  {
    name: 'pillar_1',
    effectiveLightNames: [
      'window_composite_light',
      'floor_1_light',
      'top_light',
    ],
  },
  {
    name: 'pillar_2',
    effectiveLightNames: [
      'window_composite_light',
      'floor_2_light',
      'top_light',
    ],
  },
  {
    name: 'railing_base',
    effectiveLightNames: ['window_composite_light', 'top_light'],
  },
  {
    name: 'wainscot_1',
    effectiveLightNames: [
      'window_composite_light',
      'floor_1_light',
      'top_light',
    ],
  },
  {
    name: 'wainscot_2',
    effectiveLightNames: [
      'window_composite_light',
      'floor_2_light',
      'top_light',
    ],
  },
  {
    name: 'window_frame',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'top_light',
    ],
  },
  {
    name: 'lamp_base',
    effectiveLightNames: ['window_composite_light', 'top_light'],
  },
  {
    name: 'buffet',
    effectiveLightNames: [
      'window_composite_light',
      'floor_2_light',
      'top_light',
    ],
  },
  {
    name: 'chair',
    effectiveLightNames: [
      'window_composite_light',
      'floor_2_light',
      'top_light',
    ],
  },
  {
    name: 'console_table',
    effectiveLightNames: [
      'window_composite_light',
      'floor_2_light',
      'top_light',
    ],
  },
  {
    name: 'picture_canvas_1',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
  },
  {
    name: 'picture_canvas_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
  },
  {
    name: 'picture_canvas_3',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
  },
  {
    name: 'picture_canvas_4',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
  },
  {
    name: 'picture_canvas_5',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
  },
  {
    name: 'picture_canvas_6',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
  },
  {
    name: 'picture_frame',
    effectiveLightNames: [
      'window_composite_light',
      'floor_2_light',
      'top_light',
    ],
  },
  {
    name: 'vase',
    effectiveLightNames: [
      'window_composite_light',
      'floor_2_light',
      'top_light',
    ],
  },
  {
    name: 'lamp_shade',
    effectiveLightNames: ['window_composite_light'],
  },
  {
    name: 'window_glass',
    effectiveLightNames: [],
  },
  {
    name: 'hallway_ceiling',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
  },
  {
    name: 'hallway_cornice',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
  },
  {
    name: 'hallway_door',
    effectiveLightNames: [
      'floor_1_light',
      'floor_2_light',
      'top_light',
      'hallway_front_light',
      'hallway_back_light',
    ],
  },
  {
    name: 'hallway_floor',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
  },
  {
    name: 'hallway_lamp_base',
    effectiveLightNames: ['top_light'],
  },
  {
    name: 'hallway_wainscot',
    effectiveLightNames: [
      'top_light',
      'hallway_front_light',
      'hallway_back_light',
    ],
  },
  {
    name: 'hallway_wall',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
  },
  {
    name: 'hallway_lamp_shade',
    effectiveLightNames: [],
  },
];
