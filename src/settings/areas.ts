import { floorHeight } from './meshes';

export interface AreaConfig {
  name: string;
  hidable?: boolean;
  visibleAreaNames?: string[];
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

export function getSuffix(name: string) {
  const matched = name.match(new RegExp(`(${suffixOriginal}|${suffixClone})$`));
  if (matched) {
    return matched[0];
  }
  return '';
}

// Add or remove corresponding suffix based on the reference name.
// Ex. ('mesh', 'node_clone') => 'mesh_clone'
// Ex. ('mesh_original', 'node') => 'mesh'
export function getCorrespondingName(name: string, referenceName: string) {
  const suffix = getSuffix(referenceName);
  switch (suffix) {
    case suffixOriginal:
      return getOriginalName(name);
    case suffixClone:
      return getCloneName(name);
    default:
      return getBaseName(name);
  }
}

export const areaConfig: AreaConfig = {
  name: topLevelNodeName,
  children: [
    {
      name: getOriginalName('room'),
      children: [
        {
          name: getOriginalName('floor_1'),
          hidable: true,
          visibleAreaNames: [
            getOriginalName('stairs'),
            getOriginalName('floor_1'),
            getCloneName('hallway'),
          ],
          children: [
            {
              name: getOriginalName('floor_1_meshes'),
              transform: gltfTransform,
            },
          ],
        },
        {
          name: getOriginalName('floor_2'),
          hidable: true,
          visibleAreaNames: [
            getOriginalName('hallway'),
            getOriginalName('floor_2'),
            getOriginalName('stairs'),
          ],
          children: [
            {
              name: getOriginalName('floor_2_meshes'),
              transform: gltfTransform,
            },
          ],
        },
        {
          name: getOriginalName('stairs'),
          hidable: true,
          visibleAreaNames: [
            getOriginalName('floor_2'),
            getOriginalName('stairs'),
            getOriginalName('floor_1'),
          ],
          children: [
            {
              name: getOriginalName('stairs_meshes'),
              transform: gltfTransform,
            },
          ],
        },
      ],
    },
    {
      name: getCloneName('room'),
      transform: {
        rotation: {
          x: 0,
          y: Math.PI,
          z: 0,
        },
      },
      children: [
        {
          name: getCloneName('floor_1'),
          hidable: true,
          visibleAreaNames: [
            getCloneName('stairs'),
            getCloneName('floor_1'),
            getCloneName('hallway'),
          ],
          children: [
            {
              name: getCloneName('floor_1_meshes'),
              transform: gltfTransform,
            },
          ],
        },
        {
          name: getCloneName('floor_2'),
          hidable: true,
          visibleAreaNames: [
            getOriginalName('hallway'),
            getCloneName('floor_2'),
            getCloneName('stairs'),
          ],
          children: [
            {
              name: getCloneName('floor_2_meshes'),
              transform: gltfTransform,
            },
          ],
        },
        {
          name: getCloneName('stairs'),
          hidable: true,
          visibleAreaNames: [
            getCloneName('floor_2'),
            getCloneName('stairs'),
            getCloneName('floor_1'),
          ],
          children: [
            {
              name: getCloneName('stairs_meshes'),
              transform: gltfTransform,
            },
          ],
        },
      ],
    },
    {
      name: getOriginalName('hallway'),
      hidable: true,
      visibleAreaNames: [
        getCloneName('floor_2'),
        getOriginalName('hallway'),
        getOriginalName('floor_2'),
      ],
      children: [
        {
          name: getOriginalName('hallway_meshes'),
          transform: gltfTransform,
        },
      ],
    },
    {
      name: getCloneName('hallway'),
      hidable: true,
      visibleAreaNames: [
        getOriginalName('floor_1'),
        getCloneName('hallway'),
        getCloneName('floor_1'),
        // Preload other areas to avoid rendering glitch.
        getOriginalName('hallway'),
        getOriginalName('floor_2'),
        getCloneName('floor_2'),
      ],
      transform: {
        position: {
          x: 0,
          y: -floorHeight,
          z: 0,
        },
      },
      children: [
        {
          name: getCloneName('hallway_meshes'),
          transform: gltfTransform,
        },
      ],
    },
  ],
};
