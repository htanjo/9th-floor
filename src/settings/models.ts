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
  parentNodeName: string;
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
    alphaDisabled: true,
  },
];

export const meshConfigs: MeshConfigs = [
  {
    name: 'ceiling_1_center',
    effectiveLightNames: ['floor_1_light', 'stairs_light'],
    parentNodeName: 'room_meshes',
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
    effectiveLightNames: [
      'window_composite_light',
      'floor_1_light',
      'floor_2_light',
    ],
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
    name: 'railing_baluster',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'railing_handrail',
    effectiveLightNames: ['window_composite_light', 'top_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'railing_newel',
    effectiveLightNames: ['window_composite_light', 'top_light'],
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
    name: 'door_1',
    effectiveLightNames: [
      'window_composite_light',
      'floor_1_light',
      'outer_floor_1_light',
    ],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'door_2',
    effectiveLightNames: [
      'window_composite_light',
      'floor_2_light',
      'outer_floor_2_light',
    ],
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
    name: 'railing_base',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'wainscot_1',
    effectiveLightNames: [
      'window_composite_light',
      'floor_1_light',
      'top_light',
    ],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'wainscot_2',
    effectiveLightNames: [
      'window_composite_light',
      'floor_2_light',
      'top_light',
    ],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'lamp_base',
    effectiveLightNames: ['window_composite_light', 'top_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'window_frame',
    effectiveLightNames: ['window_sun_light', 'room_composite_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'cat',
    effectiveLightNames: ['window_sun_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'chair',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'console_table',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'vase',
    effectiveLightNames: [
      'window_composite_light',
      'floor_2_light',
      'top_light',
    ],
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
    effectiveLightNames: ['window_composite_light', 'table_light', 'top_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'picture_frame_black_2',
    effectiveLightNames: [
      'window_composite_light',
      'floor_2_light',
      'top_light',
    ],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'picture_frame_gold_2',
    effectiveLightNames: [
      'window_composite_light',
      'floor_2_light',
      'top_light',
    ],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'picture_frame_silver_2',
    effectiveLightNames: [
      'window_composite_light',
      'floor_2_light',
      'top_light',
    ],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'book',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'bookshelf',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'buffet_1',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'buffet_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'chair_1',
    effectiveLightNames: ['window_composite_light', 'table_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'clock',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
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
    name: 'library_table',
    effectiveLightNames: ['window_composite_light', 'table_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'signboard',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'table_lamp_base',
    effectiveLightNames: ['window_composite_light', 'top_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'lamp_shade',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'table_lamp_shade',
    effectiveLightNames: [],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'window_glass',
    effectiveLightNames: [],
    parentNodeName: 'room_meshes',
  },
  {
    name: 'hallway_ceiling_center',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
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
    name: 'hallway_door',
    effectiveLightNames: [
      'hallway_outer_front_light',
      'hallway_outer_back_light',
      'hallway_front_light',
      'hallway_back_light',
    ],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'hallway_floor',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'hallway_lamp_base',
    effectiveLightNames: ['hallway_top_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'hallway_wainscot',
    effectiveLightNames: [
      'hallway_top_light',
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
  },
];

export const lightConfigs: LightConfigs = [
  {
    name: 'window_composite_light',
    variant: 'PointLight',
    position: {
      x: 3.4,
      y: 4.6,
      z: -20,
    },
    intensity: 3.6,
    diffuseColorHex: '#85bcff',
    radius: 1.6,
    parentNodeName: 'room',
  },
  {
    name: 'window_left_light',
    variant: 'PointLight',
    position: {
      x: 4.7,
      y: 5,
      z: -20,
    },
    intensity: 2.4,
    diffuseColorHex: '#85bcff',
    radius: 1,
    parentNodeName: 'room',
  },
  {
    name: 'window_right_light',
    variant: 'PointLight',
    position: {
      x: 2.1,
      y: 5,
      z: -20,
    },
    intensity: 2.4,
    diffuseColorHex: '#85bcff',
    radius: 1,
    parentNodeName: 'room',
  },
  {
    name: 'window_sun_light',
    variant: 'PointLight',
    position: {
      x: 1.4,
      y: 8,
      z: -26,
    },
    intensity: 0.4,
    diffuseColorHex: '#fff6e7',
    radius: 1.6,
    parentNodeName: 'room',
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
    radius: 0.1,
    parentNodeName: 'room',
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
    radius: 0.1,
    parentNodeName: 'room',
  },
  {
    name: 'stairs_light',
    variant: 'PointLight',
    position: {
      x: 4.6,
      y: 2.2,
      z: -13,
    },
    intensity: 0.2,
    diffuseColorHex: '#ffc7a4',
    radius: 0.1,
    parentNodeName: 'room',
  },
  {
    name: 'room_composite_light',
    variant: 'PointLight',
    position: {
      x: 3.4,
      y: 4.5,
      z: -15,
    },
    intensity: 0.2,
    diffuseColorHex: '#ffc7a4',
    radius: 0.2,
    parentNodeName: 'room',
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
    radius: 0.1,
    parentNodeName: 'room',
  },
  {
    name: 'outer_floor_1_light',
    variant: 'PointLight',
    position: {
      x: 0,
      y: 2.2,
      z: -6.05,
    },
    intensity: 0.25,
    diffuseColorHex: '#ffc7a4',
    radius: 0.1,
    parentNodeName: 'room',
  },
  {
    name: 'outer_floor_2_light',
    variant: 'PointLight',
    position: {
      x: 0,
      y: 5.8,
      z: -6.05,
    },
    intensity: 0.25,
    diffuseColorHex: '#ffc7a4',
    radius: 0.1,
    parentNodeName: 'room',
  },
  {
    name: 'top_light',
    variant: 'DirectionalLight',
    position: {
      x: 0.4,
      y: -1,
      z: -0.3,
    },
    intensity: 0.15,
    diffuseColorHex: '#ffdfc7',
    radius: 0.2,
    parentNodeName: 'room',
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
  },
  {
    name: 'hallway_outer_front_light',
    variant: 'PointLight',
    position: {
      x: 3.4,
      y: 5.8,
      z: -1.95,
    },
    intensity: 0.2,
    diffuseColorHex: '#ffc7a4',
    radius: 0.1,
    parentNodeName: 'hallway',
  },
  {
    name: 'hallway_outer_back_light',
    variant: 'PointLight',
    position: {
      x: -3.4,
      y: 5.8,
      z: 1.95,
    },
    intensity: 0.2,
    diffuseColorHex: '#ffc7a4',
    radius: 0.1,
    parentNodeName: 'hallway',
  },
  {
    name: 'hallway_top_light',
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
  },
];
