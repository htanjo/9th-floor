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
          name: getOriginalName('lower_floor'),
          hidable: true,
          visibleAreaNames: [
            getOriginalName('stairs'),
            getOriginalName('lower_floor'),
            getCloneName('hallway'),
          ],
          children: [
            {
              name: getOriginalName('lower_floor_meshes'),
              transform: gltfTransform,
            },
          ],
        },
        {
          name: getOriginalName('upper_floor'),
          hidable: true,
          visibleAreaNames: [
            getOriginalName('hallway'),
            getOriginalName('upper_floor'),
            getOriginalName('stairs'),
          ],
          children: [
            {
              name: getOriginalName('upper_floor_meshes'),
              transform: gltfTransform,
            },
          ],
        },
        {
          name: getOriginalName('stairs'),
          hidable: true,
          visibleAreaNames: [
            getOriginalName('upper_floor'),
            getOriginalName('stairs'),
            getOriginalName('lower_floor'),
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
          name: getCloneName('lower_floor'),
          hidable: true,
          visibleAreaNames: [
            getCloneName('stairs'),
            getCloneName('lower_floor'),
            getCloneName('hallway'),
          ],
          children: [
            {
              name: getCloneName('lower_floor_meshes'),
              transform: gltfTransform,
            },
          ],
        },
        {
          name: getCloneName('upper_floor'),
          hidable: true,
          visibleAreaNames: [
            getOriginalName('hallway'),
            getCloneName('upper_floor'),
            getCloneName('stairs'),
          ],
          children: [
            {
              name: getCloneName('upper_floor_meshes'),
              transform: gltfTransform,
            },
          ],
        },
        {
          name: getCloneName('stairs'),
          hidable: true,
          visibleAreaNames: [
            getCloneName('upper_floor'),
            getCloneName('stairs'),
            getCloneName('lower_floor'),
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
        getCloneName('upper_floor'),
        getOriginalName('hallway'),
        getOriginalName('upper_floor'),
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
        getOriginalName('lower_floor'),
        getCloneName('hallway'),
        getCloneName('lower_floor'),
        // Preload other areas to avoid rendering glitch.
        getOriginalName('hallway'),
        getOriginalName('upper_floor'),
        getCloneName('upper_floor'),
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
