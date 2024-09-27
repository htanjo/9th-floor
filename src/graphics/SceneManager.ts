import {
  AssetsManager,
  Color3,
  Color4,
  DirectionalLight,
  Engine,
  EquiRectangularCubeTextureAssetTask,
  // FreeCamera,
  PBRMaterial,
  PointLight,
  Scene,
  TextureAssetTask,
  TransformNode,
  Vector3,
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import RouteCamera from './RouteCamera';
import Effects from './Effects';
import { lightConfigs, materialConfigs, meshConfigs } from '../settings/models';
import mansionMeshUrl from '../assets/mansion.glb?url';
import lightmap1TextureUrl from '../assets/lightmap_1_0001.hdr?url';
import lightmap2TextureUrl from '../assets/lightmap_2_0001.hdr?url';
import lightmap3TextureUrl from '../assets/lightmap_3_0001.hdr?url';
import lightmap4TextureUrl from '../assets/lightmap_4_0001.hdr?url';
import lightmap5TextureUrl from '../assets/lightmap_5_0001.hdr?url';
import lightmap6TextureUrl from '../assets/lightmap_6_0001.hdr?url';
import lightmap7TextureUrl from '../assets/lightmap_7_0001.hdr?url';
import lightmap8TextureUrl from '../assets/lightmap_8_0001.hdr?url';
import lightmapHallwayTextureUrl from '../assets/lightmap_hallway_0001.hdr?url';
import environmentTextureUrl from '../assets/environment.jpg';

export default class SceneManager {
  private scene: Scene;

  private camera: RouteCamera;

  public constructor(scene: Scene) {
    this.scene = scene;
    this.camera = new RouteCamera('camera', this.scene);

    this.scene.clearColor = new Color4(0, 0, 0, 0);
    this.scene.ambientColor = Color3.White();
    this.scene.fogMode = Scene.FOGMODE_EXP2;
    this.scene.fogColor = Color3.FromHexString('#413d38');
    this.scene.fogDensity = 0.025;

    // this.scene.getEngine().setHardwareScalingLevel(1 / window.devicePixelRatio);

    // const freeCamera = new FreeCamera(
    //   'freeCamera',
    //   new Vector3(0, 1.5, 0),
    //   this.scene,
    // );
    // freeCamera.rotation.y = 180 * (Math.PI / 180);
    // freeCamera.minZ = 0.01;
    // freeCamera.fov = 57 * (Math.PI / 180);
    // freeCamera.speed = 0.1;
    // freeCamera.attachControl(this.scene.getEngine().getRenderingCanvas(), true);
    // this.scene.activeCamera = freeCamera;

    // eslint-disable-next-line no-new
    new Effects(this.scene, [this.camera]);
    // new Effects(this.scene, [freeCamera]);
  }

  public applyFrame(frame: number) {
    this.camera.frame = frame;
  }

  public applyDirection(direction: 'forward' | 'backward') {
    if (direction === 'forward') {
      this.camera.forward = true;
    } else if (direction === 'backward') {
      this.camera.forward = false;
    }
  }

  public applyTurnRate(turnRate: number) {
    this.camera.turnRate = turnRate;
  }

  public applyRotation(x: number, y: number) {
    this.camera.inputX = x;
    this.camera.inputY = y;
  }

  public loadAssets(callback: Function = () => {}) {
    const { scene } = this;
    const assetsManager = new AssetsManager(scene);
    assetsManager.addMeshTask('mansion_mesh', undefined, mansionMeshUrl, '');
    assetsManager.addTextureTask(
      'lightmap_1_texture',
      lightmap1TextureUrl,
      undefined,
      false,
    );
    assetsManager.addTextureTask(
      'lightmap_2_texture',
      lightmap2TextureUrl,
      undefined,
      false,
    );
    assetsManager.addTextureTask(
      'lightmap_3_texture',
      lightmap3TextureUrl,
      undefined,
      false,
    );
    assetsManager.addTextureTask(
      'lightmap_4_texture',
      lightmap4TextureUrl,
      undefined,
      false,
    );
    assetsManager.addTextureTask(
      'lightmap_5_texture',
      lightmap5TextureUrl,
      undefined,
      false,
    );
    assetsManager.addTextureTask(
      'lightmap_6_texture',
      lightmap6TextureUrl,
      undefined,
      false,
    );
    assetsManager.addTextureTask(
      'lightmap_7_texture',
      lightmap7TextureUrl,
      undefined,
      false,
    );
    assetsManager.addTextureTask(
      'lightmap_8_texture',
      lightmap8TextureUrl,
      undefined,
      false,
    );
    assetsManager.addTextureTask(
      'lightmap_hallway_texture',
      lightmapHallwayTextureUrl,
      undefined,
      false,
    );
    assetsManager.addEquiRectangularCubeTextureAssetTask(
      'environment_texture',
      environmentTextureUrl,
      512,
    );
    assetsManager.load();

    assetsManager.onFinish = (tasks) => {
      const { maxAnisotropy } = scene.getEngine().getCaps();

      // Add transform nodes to group meshes and lights.
      const room = new TransformNode('room', scene);
      const roomMeshes = new TransformNode('room_meshes', scene);
      roomMeshes.rotation.y = Math.PI;
      roomMeshes.scaling.z = -1;
      roomMeshes.parent = room;
      const hallway = new TransformNode('hallway', scene);
      const hallwayMeshes = new TransformNode('hallway_meshes', scene);
      hallwayMeshes.rotation.y = Math.PI;
      hallwayMeshes.scaling.z = -1;
      hallwayMeshes.parent = hallway;

      // Move meshes into transform nodes.
      meshConfigs.forEach((meshConfig) => {
        const { name, parentNodeName } = meshConfig;
        const mesh = scene.getMeshByName(name);
        if (mesh) {
          mesh.parent = scene.getNodeByName(parentNodeName);
        }
      });

      // Add specular lights.
      lightConfigs.forEach((lightConfig) => {
        let light: PointLight | DirectionalLight;
        const {
          name,
          variant,
          position,
          intensity,
          diffuseColorHex,
          radius,
          parentNodeName,
        } = lightConfig;
        switch (variant) {
          case 'DirectionalLight':
            light = new DirectionalLight(
              name,
              new Vector3(position.x, position.y, position.z),
              scene,
            );
            break;
          case 'PointLight':
          default:
            light = new PointLight(
              name,
              new Vector3(position.x, position.y, position.z),
              scene,
            );
        }
        light.intensity = intensity;
        light.diffuse = Color3.FromHexString(diffuseColorHex);
        light.radius = radius;
        light.shadowEnabled = false;
        light.parent = scene.getNodeByName(parentNodeName);
      });

      // Remove unnecessary glTF node.
      const rootNode = scene.getNodeByName('__root__');
      if (rootNode) {
        rootNode.dispose();
      }

      // Customize materials.
      scene.materials.forEach((material) => {
        if (material instanceof PBRMaterial) {
          /* eslint-disable no-param-reassign */

          // Common material config
          material.ambientColor = Color3.White();
          material.maxSimultaneousLights = 10;
          material.specularIntensity = 120; // Enhance specular lighting.
          material.enableSpecularAntiAliasing = true;
          material.forceIrradianceInFragment = true;
          // material.usePhysicalLightFalloff = false;

          const materialConfig = materialConfigs.find(
            (config) => config.name === material.name,
          );
          if (materialConfig) {
            const {
              lightmapTextureName,
              refractionTextureName,
              emissiveColorHex,
              emissiveIntensity,
              fogEnabled,
              zOffset,
              alphaDisabled,
            } = materialConfig;

            // Lightmap config
            const lightmapTexture = lightmapTextureName
              ? tasks.find(
                  (task): task is TextureAssetTask =>
                    task instanceof TextureAssetTask &&
                    task.name === lightmapTextureName,
                )?.texture
              : undefined;
            if (lightmapTexture) {
              material.lightmapTexture = lightmapTexture;
              material.lightmapTexture.coordinatesIndex = 1; // Use UV2.
              material.lightmapTexture.level = 1.0;
              material.useLightmapAsShadowmap = true;
            }

            // Refraction config
            const refractionTexture = refractionTextureName
              ? tasks.find(
                  (task): task is EquiRectangularCubeTextureAssetTask =>
                    task instanceof EquiRectangularCubeTextureAssetTask &&
                    task.name === refractionTextureName,
                )?.texture
              : undefined;
            if (refractionTexture) {
              material.refractionTexture = refractionTexture;
              material.indexOfRefraction = 0.9;
              material.metallic = 0;
              material.roughness = 1;
              material.disableLighting = true;
            }

            // Additional custom config
            if (emissiveIntensity !== undefined) {
              material.emissiveIntensity = emissiveIntensity;
              material.emissiveColor = Color3.White();
            }
            if (emissiveColorHex !== undefined) {
              material.emissiveColor = Color3.FromHexString(emissiveColorHex);
            }
            if (fogEnabled !== undefined) {
              material.fogEnabled = fogEnabled;
            }
            if (zOffset !== undefined) {
              material.zOffset = zOffset;
            }
            if (alphaDisabled) {
              material.alpha = 1;
              material.alphaMode = Engine.ALPHA_DISABLE;
            }
            if (material.albedoTexture) {
              material.albedoTexture.anisotropicFilteringLevel = maxAnisotropy;
            }
            // if (material.metallicTexture) {
            //   material.metallicTexture.anisotropicFilteringLevel = maxAnisotropy;
            // }
            // if (material.bumpTexture) {
            //   material.bumpTexture.anisotropicFilteringLevel = maxAnisotropy;
            // }
          }
          /* eslint-enable no-param-reassign */
        }
      });

      // Clone meshes and lights by node.
      const room2 = room.clone('room_2', null) as typeof room;
      room2.rotation.y = Math.PI;
      const hallway2 = hallway.clone('hallway_2', null) as typeof hallway;
      hallway2.position.y = -3.6;

      // Limit effective lights based on config and node groups.
      scene.lights.forEach((light) => {
        /* eslint-disable no-param-reassign */
        const baseLightName = light.name.split('.').pop() as string; // name: '<parentNodeName>.<baseLightName>'
        const includedMeshNames = meshConfigs
          .filter((config) =>
            config.effectiveLightNames.includes(baseLightName),
          )
          .map((config) => config.name);
        const parentNode = light.parent;
        if (parentNode) {
          const includedMeshes = parentNode.getChildMeshes().filter((mesh) => {
            const baseMeshName = mesh.name.split('.').pop() as string; // name: '<parentNodeName>.<baseMeshName>'
            return includedMeshNames.includes(baseMeshName);
          });
          light.includedOnlyMeshes = includedMeshes;
        }
        /* eslint-enable no-param-reassign */
      });

      // Trigger callback finally.
      callback();
    };
  }
}
