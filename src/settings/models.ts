export interface MaterialConfig {
  name: string;
  lightmapTextureName?: string;
  refractionTextureName?: string;
  emissiveColorHex?: string;
  emissiveIntensity?: number;
  fogEnabled?: boolean;
  zOffset?: number;
  alphaDisabled?: boolean;
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
    name: 'floor_gate',
    lightmapTextureName: 'lightmap_1_texture',
  },
  {
    name: 'floor_medallion',
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
    name: 'lamp_base',
    lightmapTextureName: 'lightmap_5_texture',
  },
  {
    name: 'window_frame',
    lightmapTextureName: 'lightmap_5_texture',
  },
  {
    name: 'cat',
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
    name: 'vase',
    lightmapTextureName: 'lightmap_6_texture',
  },
  {
    name: 'picture_canvas',
    lightmapTextureName: 'lightmap_7_texture',
  },
  {
    name: 'picture_frame_black',
    lightmapTextureName: 'lightmap_7_texture',
  },
  {
    name: 'picture_frame_gold',
    lightmapTextureName: 'lightmap_7_texture',
  },
  {
    name: 'picture_frame_silver',
    lightmapTextureName: 'lightmap_7_texture',
  },
  {
    name: 'book',
    lightmapTextureName: 'lightmap_8_texture',
  },
  {
    name: 'bookshelf',
    lightmapTextureName: 'lightmap_8_texture',
  },
  {
    name: 'buffet',
    lightmapTextureName: 'lightmap_8_texture',
  },
  {
    name: 'chair_1',
    lightmapTextureName: 'lightmap_8_texture',
  },
  {
    name: 'clock',
    lightmapTextureName: 'lightmap_8_texture',
  },
  {
    name: 'corner_cabinet',
    lightmapTextureName: 'lightmap_8_texture',
  },
  {
    name: 'library_table',
    lightmapTextureName: 'lightmap_8_texture',
  },
  {
    name: 'signboard',
    lightmapTextureName: 'lightmap_8_texture',
  },
  {
    name: 'table_lamp_base',
    lightmapTextureName: 'lightmap_8_texture',
  },
  {
    name: 'lamp_shade',
    emissiveIntensity: 2.8,
    alphaDisabled: true,
  },
  {
    name: 'table_lamp_shade',
    emissiveIntensity: 1.8,
    alphaDisabled: true,
  },
  {
    name: 'window_glass',
    refractionTextureName: 'environment_texture',
    emissiveIntensity: 0.6,
    emissiveColorHex: '#7bb3ff',
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
    emissiveIntensity: 2.8,
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
    name: 'floor_1_gate',
    effectiveLightNames: ['window_right_light', 'floor_1_light'],
  },
  {
    name: 'floor_1_medallion',
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
    name: 'floor_2_gate',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'floor_2_light',
    ],
  },
  {
    name: 'floor_2_medallion',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'floor_2_light',
    ],
  },
  {
    name: 'wall_room_1',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
  },
  {
    name: 'wall_room_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
  },
  {
    name: 'wall_stairs',
    effectiveLightNames: [
      'window_composite_light',
      'floor_1_light',
      'floor_2_light',
    ],
  },
  {
    name: 'stairs_back',
    effectiveLightNames: ['stairs_light'],
  },
  {
    name: 'stairs_landing',
    effectiveLightNames: ['window_composite_light'],
  },
  {
    name: 'stairs_steps',
    effectiveLightNames: ['window_composite_light'],
  },
  {
    name: 'railing_baluster',
    effectiveLightNames: ['window_composite_light'],
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
      'hallway_front_light',
    ],
  },
  {
    name: 'door_2',
    effectiveLightNames: [
      'window_composite_light',
      'floor_2_light',
      'hallway_front_light',
    ],
  },
  {
    name: 'pillar_1',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
  },
  {
    name: 'pillar_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
  },
  {
    name: 'railing_base',
    effectiveLightNames: ['window_composite_light'],
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
    name: 'lamp_base',
    effectiveLightNames: ['window_composite_light', 'top_light'],
  },
  {
    name: 'window_frame',
    effectiveLightNames: ['window_sun_light', 'room_composite_light'],
  },
  {
    name: 'cat',
    effectiveLightNames: ['window_sun_light'],
  },
  {
    name: 'chair',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
  },
  {
    name: 'console_table',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
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
    name: 'picture_canvas_1',
    effectiveLightNames: ['window_composite_light', 'table_light'],
  },
  {
    name: 'picture_canvas_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
  },
  {
    name: 'picture_frame_black_1',
    effectiveLightNames: ['window_composite_light', 'table_light', 'top_light'],
  },
  {
    name: 'picture_frame_black_2',
    effectiveLightNames: [
      'window_composite_light',
      'floor_2_light',
      'top_light',
    ],
  },
  {
    name: 'picture_frame_gold_2',
    effectiveLightNames: [
      'window_composite_light',
      'floor_2_light',
      'top_light',
    ],
  },
  {
    name: 'picture_frame_silver_2',
    effectiveLightNames: [
      'window_composite_light',
      'floor_2_light',
      'top_light',
    ],
  },
  {
    name: 'book',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
  },
  {
    name: 'bookshelf',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
  },
  {
    name: 'buffet_1',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
  },
  {
    name: 'buffet_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
  },
  {
    name: 'chair_1',
    effectiveLightNames: ['window_composite_light', 'table_light'],
  },
  {
    name: 'clock',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
  },
  {
    name: 'corner_cabinet_1',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
  },
  {
    name: 'corner_cabinet_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
  },
  {
    name: 'library_table',
    effectiveLightNames: ['window_composite_light', 'table_light'],
  },
  {
    name: 'signboard',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
  },
  {
    name: 'table_lamp_base',
    effectiveLightNames: ['window_composite_light', 'top_light'],
  },
  {
    name: 'lamp_shade',
    effectiveLightNames: ['window_composite_light'],
  },
  {
    name: 'table_lamp_shade',
    effectiveLightNames: [],
  },
  {
    name: 'window_glass',
    effectiveLightNames: [],
  },
  {
    name: 'hallway_ceiling_center',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
  },
  {
    name: 'hallway_ceiling_edge',
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
