export interface MeshConfig {
  name: string;
  effectiveLightNames: string[];
  parentNodeName: string;
  isVisible?: boolean;
}

export type MeshConfigs = MeshConfig[];

export const floorHeight = 3.6;

export const meshConfigs: MeshConfigs = [
  // Lightmap 01: wall ==============================================
  // Upper floor
  {
    name: 'cornice_upper',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'decal_spiderweb_upper',
    effectiveLightNames: [],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'decal_wall_upper',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'wainscot_upper',
    effectiveLightNames: ['window_composite_light', 'top_right_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'wall_upper',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  // Lower floor
  {
    name: 'cornice_lower',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'decal_spiderweb_lower',
    effectiveLightNames: [],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'decal_wall_lower',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'wainscot_lower',
    effectiveLightNames: ['window_composite_light', 'top_left_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'wall_lower',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  // Stairs
  {
    name: 'cornice_stairs',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'decal_spiderweb_stairs',
    effectiveLightNames: [],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'decal_wall_stairs',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'wainscot_stairs',
    effectiveLightNames: ['window_composite_light', 'room_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'wall_stairs',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  // Hallway
  {
    name: 'cornice_hallway',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'decal_spiderweb_hallway',
    effectiveLightNames: [], // Avoid unexpected specular and z-fighting.
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'decal_wall_hallway',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'wainscot_hallway',
    effectiveLightNames: [
      'hallway_top_right_light',
      'hallway_front_light',
      'hallway_back_light',
    ],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'wall_hallway',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },

  // Lightmap 02: ceiling, floor ====================================
  // Upper floor
  {
    name: 'ceiling_center_upper',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'ceiling_edge_upper',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'ceiling_center_upper',
    effectiveLightNames: ['floor_1_light', 'stairs_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'ceiling_edge_upper',
    effectiveLightNames: ['floor_1_light', 'stairs_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'decal_floor_upper',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'floor_2_light',
    ],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'floor_center_upper',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'floor_2_light',
    ],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'floor_edge_upper',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'floor_2_light',
    ],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'floor_gate_upper',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'floor_2_light',
    ],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'floor_medallion_upper',
    effectiveLightNames: [
      'window_left_light',
      'window_right_light',
      'floor_2_light',
    ],
    parentNodeName: 'floor_2_meshes',
  },
  // Lower floor
  {
    name: 'ceiling_center_lower',
    effectiveLightNames: ['floor_1_light', 'stairs_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'ceiling_edge_lower',
    effectiveLightNames: ['floor_1_light', 'stairs_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'decal_floor_lower',
    effectiveLightNames: ['window_right_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'floor_center_lower',
    effectiveLightNames: ['window_right_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'floor_edge_lower',
    effectiveLightNames: ['window_right_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'floor_gate_lower',
    effectiveLightNames: ['window_right_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'floor_medallion_lower',
    effectiveLightNames: ['window_right_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  // Stairs
  {
    name: 'ceiling_center_stairs',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'ceiling_edge_stairs',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'stairs_back_stairs',
    effectiveLightNames: ['stairs_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'stairs_landing_stairs',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  // Hallway
  {
    name: 'ceiling_center_hallway',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'ceiling_edge_hallway',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'floor_center_hallway',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'floor_edge_hallway',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'floor_gate_hallway',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },

  // Lightmap 03: large interior ====================================
  // Upper floor
  {
    name: 'door_upper',
    effectiveLightNames: ['floor_2_light', 'door_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'pillar_upper',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  // Lower floor
  {
    name: 'door_lower',
    effectiveLightNames: ['floor_1_light', 'door_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'pillar_lower',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  // Stairs
  {
    name: 'window_frame_stairs',
    effectiveLightNames: ['window_sun_light', 'room_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  // Hallway
  {
    name: 'door_front_hallway',
    effectiveLightNames: ['hallway_front_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'door_back_hallway',
    effectiveLightNames: ['hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'pillar_hallway',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },

  // Lightmap 04: small interior ====================================
  // Upper floor
  {
    name: 'lamp_base_center_upper',
    effectiveLightNames: ['lamp_center_2_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'lamp_base_back_upper',
    effectiveLightNames: ['lamp_center_2_light', 'window_composite_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'lamp_base_front_upper',
    effectiveLightNames: ['lamp_front_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  // Lower floor
  {
    name: 'lamp_base_back_lower',
    effectiveLightNames: ['lamp_center_1_light', 'window_composite_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'lamp_base_center_lower',
    effectiveLightNames: ['lamp_center_1_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'lamp_base_front_lower',
    effectiveLightNames: ['lamp_front_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  // Stairs
  {
    name: 'lamp_base_stairs',
    effectiveLightNames: ['window_composite_light', 'room_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'lamp_shade_off_stairs',
    effectiveLightNames: ['window_composite_light', 'room_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'railing_baluster_stairs',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'railing_base_stairs',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'railing_handrail_stairs',
    effectiveLightNames: ['window_composite_light', 'top_right_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'railing_newel_stairs',
    effectiveLightNames: ['window_composite_light', 'top_right_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'stairs_steps_stairs',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'stairs_meshes',
  },
  // Hallway
  {
    name: 'lamp_base_front_hallway',
    effectiveLightNames: ['hallway_lamp_front_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'lamp_base_back_hallway',
    effectiveLightNames: ['hallway_lamp_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'lamp_base_side_hallway',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },
  {
    name: 'lamp_shade_off_hallway',
    effectiveLightNames: ['hallway_front_light', 'hallway_back_light'],
    parentNodeName: 'hallway_meshes',
  },

  // Lightmap 05: large furniture ===================================
  // Lower floor
  {
    name: 'bookshelf_lower',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'library_table_lower',
    effectiveLightNames: ['window_composite_light', 'table_light'],
    parentNodeName: 'floor_1_meshes',
  },
  // Stairs
  {
    name: 'library_table_stairs',
    effectiveLightNames: ['window_composite_light', 'stairs_light'],
    parentNodeName: 'stairs_meshes',
  },

  // Lightmap 06: small furniture ===================================
  // Upper floor
  {
    name: 'buffet_upper',
    effectiveLightNames: ['window_composite_light', 'mirror_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'chair_upper',
    effectiveLightNames: ['window_inner_light', 'chair_front_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'console_table_upper',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'corner_cabinet_upper',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  // Lower floor
  {
    name: 'buffet_lower',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'chair_lower',
    effectiveLightNames: ['window_inner_light', 'table_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'clock_lower',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'corner_cabinet_lower',
    effectiveLightNames: ['window_composite_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  // Stairs
  {
    name: 'buffet_stairs',
    effectiveLightNames: ['window_composite_light', 'stairs_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'chair_stairs',
    effectiveLightNames: ['window_composite_light', 'stairs_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'console_table_stairs',
    effectiveLightNames: ['window_composite_light', 'stairs_light'],
    parentNodeName: 'stairs_meshes',
  },

  // Lightmap 07: hanging object ====================================
  // Upper floor
  {
    name: 'mirror_frame_upper',
    effectiveLightNames: ['window_composite_light', 'mirror_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'mirror_surface_upper',
    effectiveLightNames: [],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'picture_canvas_upper',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'picture_frame_black_upper',
    effectiveLightNames: ['window_distant_light', 'floor_2_distant_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'picture_frame_gold_upper',
    effectiveLightNames: ['window_distant_light', 'floor_2_distant_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'picture_frame_silver_upper',
    effectiveLightNames: ['window_distant_light', 'floor_2_distant_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'picture_label_upper',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'picture_rail_upper',
    effectiveLightNames: ['window_composite_light', 'chair_front_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'signboard_base_upper',
    effectiveLightNames: ['signboard_left_light', 'signboard_right_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'signboard_front_1_upper',
    effectiveLightNames: ['signboard_left_light', 'signboard_right_light'],
    parentNodeName: 'floor_2_meshes',
    isVisible: false,
  },
  {
    name: 'signboard_front_2_upper',
    effectiveLightNames: ['signboard_left_light', 'signboard_right_light'],
    parentNodeName: 'floor_2_meshes',
    isVisible: false,
  },
  {
    name: 'signboard_front_3_upper',
    effectiveLightNames: ['signboard_left_light', 'signboard_right_light'],
    parentNodeName: 'floor_2_meshes',
    isVisible: false,
  },
  {
    name: 'signboard_front_4_upper',
    effectiveLightNames: ['signboard_left_light', 'signboard_right_light'],
    parentNodeName: 'floor_2_meshes',
    isVisible: false,
  },
  {
    name: 'signboard_front_5_upper',
    effectiveLightNames: ['signboard_left_light', 'signboard_right_light'],
    parentNodeName: 'floor_2_meshes',
    isVisible: false,
  },
  {
    name: 'signboard_front_6_upper',
    effectiveLightNames: ['signboard_left_light', 'signboard_right_light'],
    parentNodeName: 'floor_2_meshes',
    isVisible: false,
  },
  {
    name: 'signboard_front_7_upper',
    effectiveLightNames: ['signboard_left_light', 'signboard_right_light'],
    parentNodeName: 'floor_2_meshes',
    isVisible: false,
  },
  {
    name: 'signboard_front_8_upper',
    effectiveLightNames: ['signboard_left_light', 'signboard_right_light'],
    parentNodeName: 'floor_2_meshes',
    isVisible: false,
  },
  {
    name: 'signboard_front_9_upper',
    effectiveLightNames: ['signboard_left_light', 'signboard_right_light'],
    parentNodeName: 'floor_2_meshes',
    isVisible: false,
  },
  {
    name: 'sword_upper',
    effectiveLightNames: ['window_composite_light', 'sword_light'],
    parentNodeName: 'floor_2_meshes',
  },
  // Lower floor
  {
    name: 'picture_canvas_lower',
    effectiveLightNames: ['window_composite_light', 'table_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'picture_frame_black_lower',
    effectiveLightNames: ['window_composite_light', 'table_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'picture_label_lower',
    effectiveLightNames: ['window_composite_light', 'table_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'picture_rail_lower',
    effectiveLightNames: ['window_composite_light', 'table_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'poster_lower',
    effectiveLightNames: ['floor_1_light', 'table_light'],
    parentNodeName: 'floor_1_meshes',
  },
  // Stairs
  {
    name: 'picture_canvas_stairs',
    effectiveLightNames: ['window_composite_gentle_light', 'mirror_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'picture_frame_black_stairs',
    effectiveLightNames: ['window_distant_light', 'mirror_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'picture_frame_gold_stairs',
    effectiveLightNames: ['window_distant_light', 'mirror_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'picture_frame_silver_stairs',
    effectiveLightNames: ['window_distant_light', 'mirror_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'picture_label_stairs',
    effectiveLightNames: ['window_composite_light', 'mirror_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'picture_rail_stairs',
    effectiveLightNames: ['window_composite_light', 'mirror_light'],
    parentNodeName: 'stairs_meshes',
  },

  // Lightmap 08: Large object ======================================
  // Lower floor
  {
    name: 'book_lower',
    effectiveLightNames: ['table_light', 'top_right_light'],
    parentNodeName: 'floor_1_meshes',
  },

  // Lightmap 09: Small object ======================================
  // Upper floor
  {
    name: 'bottle_upper',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'box_upper',
    effectiveLightNames: ['window_right_light', 'top_right_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'globe_upper',
    effectiveLightNames: ['window_composite_light', 'mirror_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'lantern_upper',
    effectiveLightNames: ['window_composite_light', 'top_right_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'phonograph_base_upper',
    effectiveLightNames: ['window_composite_light', 'phonograph_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'phonograph_arm_upper',
    effectiveLightNames: ['window_composite_light', 'phonograph_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'phonograph_disk_upper',
    effectiveLightNames: ['window_composite_light', 'phonograph_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'stationery_upper',
    effectiveLightNames: ['window_composite_light', 'floor_2_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'vase_upper',
    effectiveLightNames: ['window_composite_light', 'top_left_light'],
    parentNodeName: 'floor_2_meshes',
  },
  // Lower floor
  {
    name: 'bottle_lower',
    effectiveLightNames: ['window_composite_light', 'top_left_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'box_lower',
    effectiveLightNames: ['window_composite_light', 'top_left_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'cloth_lower',
    effectiveLightNames: ['window_inner_light', 'floor_1_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'lantern_lower',
    effectiveLightNames: ['window_composite_light', 'top_left_light'],
    parentNodeName: 'floor_1_meshes',
  },
  // Stairs
  {
    name: 'box_stairs',
    effectiveLightNames: ['window_composite_light', 'stairs_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'cat_stairs',
    effectiveLightNames: ['window_distant_light'],
    parentNodeName: 'stairs_meshes',
  },
  {
    name: 'cloth_stairs',
    effectiveLightNames: ['window_distant_light'],
    parentNodeName: 'stairs_meshes',
  },

  // Lightmap 10: anomaly ===========================================
  // Upper floor
  {
    name: 'sword_anomaly',
    effectiveLightNames: ['window_composite_light', 'sword_light'],
    parentNodeName: 'floor_2_meshes',
    isVisible: false,
  },
  // Lower floor
  {
    name: 'chair_outside_anomaly',
    effectiveLightNames: ['floor_1_light', 'table_light'],
    parentNodeName: 'floor_1_meshes',
    isVisible: false,
  },
  // Stairs
  {
    name: 'picture_canvas_anomaly',
    effectiveLightNames: ['window_composite_gentle_light', 'mirror_light'],
    parentNodeName: 'stairs_meshes',
    isVisible: false,
  },

  // Lightmap none ==================================================
  // Upper floor
  {
    name: 'lamp_shade_front_upper',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'lamp_shade_center_left_upper',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'lamp_shade_center_right_upper',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'lamp_shade_back_left_upper',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'lamp_shade_back_right_upper',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_2_meshes',
  },
  {
    name: 'stationery_lower',
    effectiveLightNames: ['table_light', 'top_right_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'table_lamp_base_lower',
    effectiveLightNames: ['lamp_center_1_light', 'top_left_light'],
    parentNodeName: 'floor_1_meshes',
  },
  // Lower floor
  {
    name: 'lamp_shade_front_lower',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'lamp_shade_center_left_lower',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'lamp_shade_center_right_lower',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'lamp_shade_back_left_lower',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'lamp_shade_back_right_lower',
    effectiveLightNames: ['window_composite_light'],
    parentNodeName: 'floor_1_meshes',
  },
  {
    name: 'table_lamp_shade_lower',
    effectiveLightNames: [],
    parentNodeName: 'floor_1_meshes',
  },
  // Stairs
  {
    name: 'window_glass_stairs',
    effectiveLightNames: [],
    parentNodeName: 'stairs_meshes',
  },
  // Anomaly
  {
    name: 'chair_outside_shadow_anomaly',
    effectiveLightNames: [],
    parentNodeName: 'floor_1_meshes',
    isVisible: false,
  },
  {
    name: 'floor_none_anomaly',
    effectiveLightNames: [],
    parentNodeName: 'floor_1_meshes',
    isVisible: false,
  },
  // Hallway
  {
    name: 'lamp_shade_hallway',
    effectiveLightNames: [],
    parentNodeName: 'hallway_meshes',
  },
];
