import { floorHeight } from './meshes';

export interface AreaConfig {
  name: string;
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
  children?: AreaConfig[];
}

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

export const topLevelNodeName = 'mansion';
export const suffixOriginal = '_original';
export const suffixClone = '_clone';

export function getBaseName(name: string) {
  return name.replace(new RegExp(`(${suffixOriginal}|${suffixClone})$`), '');
}

export function getOriginalName(name: string) {
  const baseName = getBaseName(name);
  return `${baseName}${suffixOriginal}`;
}

export function getCloneName(name: string) {
  const baseName = getBaseName(name);
  return `${baseName}${suffixClone}`;
}

// Add or remove corresponding suffix based on the reference name.
// Ex. ('mesh', 'node_clone') => 'mesh_clone'
// Ex. ('mesh_original', 'node') => 'mesh'
export function getCorrespondingName(name: string, referenceName: string) {
  if (referenceName.endsWith(suffixOriginal)) {
    return getOriginalName(name);
  }
  if (referenceName.endsWith(suffixClone)) {
    return getCloneName(name);
  }
  return getBaseName(name);
}

export const areaConfig: AreaConfig = {
  name: topLevelNodeName,
  children: [
    {
      name: `room${suffixOriginal}`,
      children: [
        {
          name: `floor_1${suffixOriginal}`,
          children: [
            {
              name: `floor_1_meshes${suffixOriginal}`,
              transform: gltfTransform,
            },
          ],
        },
        {
          name: `floor_2${suffixOriginal}`,
          children: [
            {
              name: `floor_2_meshes${suffixOriginal}`,
              transform: gltfTransform,
            },
          ],
        },
        {
          name: `stairs${suffixOriginal}`,
          children: [
            {
              name: `stairs_meshes${suffixOriginal}`,
              transform: gltfTransform,
            },
          ],
        },
      ],
    },
    {
      name: `room${suffixClone}`,
      transform: {
        rotation: {
          x: 0,
          y: Math.PI,
          z: 0,
        },
      },
      children: [
        {
          name: `floor_1${suffixClone}`,
          children: [
            {
              name: `floor_1_meshes${suffixClone}`,
              transform: gltfTransform,
            },
          ],
        },
        {
          name: `floor_2${suffixClone}`,
          children: [
            {
              name: `floor_2_meshes${suffixClone}`,
              transform: gltfTransform,
            },
          ],
        },
        {
          name: `stairs${suffixClone}`,
          children: [
            {
              name: `stairs_meshes${suffixClone}`,
              transform: gltfTransform,
            },
          ],
        },
      ],
    },
    {
      name: `hallway${suffixOriginal}`,
      children: [
        {
          name: `hallway_meshes${suffixOriginal}`,
          transform: gltfTransform,
        },
      ],
    },
    {
      name: `hallway${suffixClone}`,
      transform: {
        position: {
          x: 0,
          y: -floorHeight,
          z: 0,
        },
      },
      children: [
        {
          name: `hallway_meshes${suffixClone}`,
          transform: gltfTransform,
        },
      ],
    },
  ],
};
