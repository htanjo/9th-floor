export interface MeshConfig {
  name: string;
  effectiveLightNames: string[];
  parentNodeName: string;
}

export type MeshConfigs = MeshConfig[];

export const floorHeight = 3.6;

export const meshConfigs: MeshConfigs = [
  {
    name: 'ceiling_1_center',
    effectiveLightNames: ['floor_1_light', 'stairs_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'ceiling_1_edge',
    effectiveLightNames: ['floor_1_light', 'stairs_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'ceiling_2_center',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'ceiling_2_edge',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'ceiling_stairs_center',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'ceiling_stairs_edge',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'cornice_1',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'cornice_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'cornice_stairs',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'floor_1_center',
    effectiveLightNames: ['window_right_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'floor_1_edge',
    effectiveLightNames: ['window_right_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'floor_1_gate',
    effectiveLightNames: ['window_right_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'floor_1_medallion',
    effectiveLightNames: ['window_right_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'floor_2_center',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'floor_2_light',
    ],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'floor_2_edge',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'floor_2_light',
    ],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'floor_2_gate',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'floor_2_light',
    ],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'floor_2_medallion',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'floor_2_light',
    ],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'wainscot_1',
    effectiveLightNames: ['window_composite_light', 'top_left_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'wainscot_2',
    effectiveLightNames: ['window_composite_light', 'top_right_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'wainscot_stairs',
    effectiveLightNames: ['window_composite_light', 'room_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'wall_room_1',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'wall_room_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'wall_stairs',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'door_1',
    effectiveLightNames: ['floor_1_light', 'door_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'door_2',
    effectiveLightNames: ['floor_2_light', 'door_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'lamp_base_back_1',
    effectiveLightNames: ['lamp_center_1_light', 'window_composite_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'lamp_base_back_2',
    effectiveLightNames: ['lamp_center_2_light', 'window_composite_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'lamp_base_center_1',
    effectiveLightNames: ['lamp_center_1_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'lamp_base_center_2',
    effectiveLightNames: ['lamp_center_2_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'lamp_base_front_1',
    effectiveLightNames: ['lamp_front_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'lamp_base_front_2',
    effectiveLightNames: ['lamp_front_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'lamp_base_stairs',
    effectiveLightNames: ['window_composite_light', 'room_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'lamp_shade_off',
    effectiveLightNames: ['window_composite_light', 'room_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'pillar_1',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'pillar_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'railing_baluster',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'railing_base',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'railing_handrail',
    effectiveLightNames: ['window_composite_light', 'top_right_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'railing_newel',
    effectiveLightNames: ['window_composite_light', 'top_right_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'stairs_back',
    effectiveLightNames: ['stairs_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'stairs_landing',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'stairs_steps',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'window_frame',
    effectiveLightNames: ['window_sun_light', 'room_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'bookshelf',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'buffet_1',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'buffet_2',
    effectiveLightNames: ['window_composite_light', 'mirror_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'buffet_stairs',
    effectiveLightNames: ['window_composite_light', 'stairs_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'library_table',
    effectiveLightNames: ['window_composite_light', 'table_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'library_table_stairs',
    effectiveLightNames: ['window_composite_light', 'stairs_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'chair_1',
    effectiveLightNames: ['window_inner_light', 'table_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'chair_2',
    effectiveLightNames: ['window_inner_light', 'chair_front_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'chair_stairs',
    effectiveLightNames: ['window_composite_light', 'stairs_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'clock',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'console_table',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'console_table_stairs',
    effectiveLightNames: ['window_composite_light', 'stairs_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'corner_cabinet_1',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'corner_cabinet_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'picture_canvas_1',
    effectiveLightNames: ['window_composite_light', 'table_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'picture_canvas_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'picture_canvas_stairs',
    effectiveLightNames: ['window_composite_gentle_light', 'mirror_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'picture_frame_black_1',
    effectiveLightNames: ['window_composite_light', 'table_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'picture_frame_black_2',
    effectiveLightNames: ['window_distant_light', 'floor_2_distant_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'picture_frame_black_stairs',
    effectiveLightNames: ['window_distant_light', 'mirror_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'picture_frame_gold_2',
    effectiveLightNames: ['window_distant_light', 'floor_2_distant_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'picture_frame_gold_stairs',
    effectiveLightNames: ['window_distant_light', 'mirror_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'picture_frame_silver_2',
    effectiveLightNames: ['window_distant_light', 'floor_2_distant_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'picture_frame_silver_stairs',
    effectiveLightNames: ['window_distant_light', 'mirror_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'signboard',
    effectiveLightNames: ['signboard_left_light', 'signboard_right_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'table_lamp_base',
    effectiveLightNames: ['lamp_center_1_light', 'top_left_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'book',
    effectiveLightNames: ['table_light', 'top_right_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'bottle_1',
    effectiveLightNames: ['window_composite_light', 'top_left_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'bottle_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'box_1',
    effectiveLightNames: ['window_composite_light', 'top_left_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'box_2',
    effectiveLightNames: ['window_right_light', 'top_right_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'box_stairs',
    effectiveLightNames: ['window_composite_light', 'stairs_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'cat',
    effectiveLightNames: ['window_distant_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'cat_cloth',
    effectiveLightNames: ['window_distant_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'globe',
    effectiveLightNames: ['window_composite_light', 'mirror_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'lantern_1',
    effectiveLightNames: ['window_composite_light', 'top_left_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'lantern_2',
    effectiveLightNames: ['window_composite_light', 'top_right_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'mirror_frame',
    effectiveLightNames: ['window_composite_light', 'mirror_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'mirror_surface',
    effectiveLightNames: [],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'phonograph',
    effectiveLightNames: ['window_composite_light', 'phonograph_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'phonograph_arm',
    effectiveLightNames: ['window_composite_light', 'phonograph_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'phonograph_disk',
    effectiveLightNames: ['window_composite_light', 'phonograph_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'picture_rail_1',
    effectiveLightNames: ['window_composite_light', 'table_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'picture_rail_2',
    effectiveLightNames: ['window_composite_light', 'chair_front_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'picture_rail_stairs',
    effectiveLightNames: ['window_composite_light', 'mirror_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'poster',
    effectiveLightNames: ['floor_1_light', 'table_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'sword',
    effectiveLightNames: ['window_composite_light', 'sword_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'typewriter',
    effectiveLightNames: ['table_light', 'top_right_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'typewriter_2',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'vase',
    effectiveLightNames: ['window_composite_light', 'top_left_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'decal_spiderweb_1',
    effectiveLightNames: [],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'decal_spiderweb_2',
    effectiveLightNames: [],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'decal_spiderweb_stairs',
    effectiveLightNames: [],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'decal_floor_1',
    effectiveLightNames: ['window_right_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'decal_floor_2',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'floor_2_light',
    ],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'decal_wall_1',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'decal_wall_2',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'decal_wall_stairs',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'lamp_shade_front_1',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'lamp_shade_front_2',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'lamp_shade_middle_left_1',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'lamp_shade_middle_left_2',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'lamp_shade_middle_right_1',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'lamp_shade_middle_right_2',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'lamp_shade_back_left_1',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'lamp_shade_back_left_2',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'lamp_shade_back_right_1',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'lamp_shade_back_right_2',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'table_lamp_shade',
    effectiveLightNames: [],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'window_glass',
    effectiveLightNames: [],
    parentNodeName: 'stairs_meshes',
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
  },
];
