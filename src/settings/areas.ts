import { floorHeight } from './meshes';

export interface AreaConfig {
  name: string;
  parentNodeName?: string;
  cloneSource?: string;
  transform?: {
    position?: {
      x: number;
      y: number;
      z: number;
    };
    rotation?: {
      x: number;
      y: number;
      z: number;
    };
    scaling?: {
      x: number;
      y: number;
      z: number;
    };
  };
}

export type AreaConfigs = AreaConfig[];

const gltfTransform: AreaConfig['transform'] = {
  rotation: {
    x: 0,
    y: Math.PI,
    z: 0,
  },
  scaling: {
    x: 1,
    y: 1,
    z: -1,
  },
};

export const areaConfigs: AreaConfigs = [
  {
    name: 'room',
  },
  {
    name: 'clone.room',
    cloneSource: 'room',
    transform: {
      rotation: {
        x: 0,
        y: Math.PI,
        z: 0,
      },
    },
  },
  {
    name: 'hallway',
  },
  {
    name: 'clone.hallway',
    cloneSource: 'hallway',
    transform: {
      position: {
        x: 0,
        y: -floorHeight,
        z: 0,
      },
    },
  },
  {
    name: 'room_meshes',
    parentNodeName: 'room',
    transform: gltfTransform,
  },
  // {
  //   name: 'floor_1',
  //   parentNodeName: 'room',
  // },
  // {
  //   name: 'floor_2',
  //   parentNodeName: 'room',
  // },
  // {
  //   name: 'stairs',
  //   parentNodeName: 'room',
  // },
  // {
  //   name: 'floor_1_meshes',
  //   parentNodeName: 'floor_1',
  //   transform: gltfTransform,
  // },
  // {
  //   name: 'floor_2_meshes',
  //   parentNodeName: 'floor_2',
  //   transform: gltfTransform,
  // },
  // {
  //   name: 'stairs_meshes',
  //   parentNodeName: 'stairs',
  //   transform: gltfTransform,
  // },
  {
    name: 'hallway_meshes',
    parentNodeName: 'hallway',
    transform: gltfTransform,
  },
];
