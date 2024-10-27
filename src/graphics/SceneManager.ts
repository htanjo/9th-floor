import {
  Animation,
  AssetsManager,
  Color3,
  Color4,
  DirectionalLight,
  Engine,
  HDRCubeTextureAssetTask,
  Material,
  MeshBuilder,
  PBRMaterial,
  PointLight,
  Scene,
  StandardMaterial,
  TextureAssetTask,
  TransformNode,
  Vector3,
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import RouteCamera from './RouteCamera';
import Effects from './Effects';
import {
  floorHeight,
  lightConfigs,
  materialConfigs,
  meshConfigs,
} from '../settings/models';
import mansionMeshUrl from '../assets/mansion.glb?url';
import lightmap1TextureUrl from '../assets/lightmap_1_0001.hdr?url';
import lightmap2TextureUrl from '../assets/lightmap_2_0001.hdr?url';
import lightmap3TextureUrl from '../assets/lightmap_3_0001.hdr?url';
import lightmap4TextureUrl from '../assets/lightmap_4_0001.hdr?url';
import lightmap5TextureUrl from '../assets/lightmap_5_0001.hdr?url';
import lightmapHallwayTextureUrl from '../assets/lightmap_hallway_0001.hdr?url';
import environmentOutdoorTextureUrl from '../assets/environment_outdoor.hdr?url';
import environmentMirrorTextureUrl from '../assets/environment_mirror.hdr?url';

export default class SceneManager {
  private scene: Scene;

  private camera: RouteCamera;

  private rootNode: TransformNode;

  private remainingLoaded: number = 0;

  private totalLoaded: number = 0;

  private emitter: EventTarget;

  public constructor(scene: Scene) {
    this.scene = scene;
    this.camera = new RouteCamera('route_camera', this.scene);

    this.scene.clearColor = new Color4(0, 0, 0, 0);
    this.scene.ambientColor = Color3.White();
    this.scene.fogMode = Scene.FOGMODE_EXP2;
    this.scene.fogColor = Color3.FromHexString('#413d38');
    this.scene.fogDensity = 0.025;
    this.scene.imageProcessingConfiguration.toneMappingEnabled = true;

    this.rootNode = new TransformNode('root_node', scene);

    // this.scene.getEngine().setHardwareScalingLevel(1 / window.devicePixelRatio);

    // eslint-disable-next-line no-new
    new Effects(this.scene, [this.camera]);

    this.emitter = new EventTarget();
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

  public applyRoute(offset: number, invert: boolean) {
    const { rootNode } = this;
    this.camera.updateRoute(offset, invert);
    rootNode.position.y = offset * floorHeight;
  }

  public loadAssets() {
    const { scene } = this;
    const assetsManager = new AssetsManager(scene);

    // Hide built-in loading screen.
    assetsManager.useDefaultLoadingScreen = false;

    // Load assets.
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
      'lightmap_hallway_texture',
      lightmapHallwayTextureUrl,
      undefined,
      false,
    );
    assetsManager.addHDRCubeTextureTask(
      'environment_outdoor_texture',
      environmentOutdoorTextureUrl,
      512,
    );
    assetsManager.addHDRCubeTextureTask(
      'environment_mirror_texture',
      environmentMirrorTextureUrl,
      512,
    );
    assetsManager.load();
    assetsManager.onProgress = (remaining, total) => {
      this.remainingLoaded = remaining;
      this.totalLoaded = total;
      this.emitter.dispatchEvent(new CustomEvent('assetsLoadingProgress'));
    };

    assetsManager.onFinish = (tasks) => {
      const { maxAnisotropy } = scene.getEngine().getCaps();

      // Create skybox.
      const skybox = MeshBuilder.CreateBox('skybox', { size: 1000 }, scene);
      skybox.material = new StandardMaterial('skybox', scene);
      skybox.material.backFaceCulling = false;
      skybox.parent = this.rootNode; // If skybox is visible from window, don't include it in rootNode.

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
          animation,
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

        // Apply light animation.
        if (animation) {
          const {
            targetProperty,
            easingFunction,
            easingMode,
            framePerSecond,
            keys,
          } = animation;
          const lightAnimation = new Animation(
            `${name}_light_animation`,
            targetProperty,
            framePerSecond,
            Animation.ANIMATIONTYPE_FLOAT,
            Animation.ANIMATIONLOOPMODE_CYCLE,
          );
          easingFunction.setEasingMode(easingMode);
          lightAnimation.setEasingFunction(easingFunction);
          lightAnimation.setKeys(keys);
          scene.beginDirectAnimation(
            light,
            [lightAnimation],
            0,
            keys[keys.length - 1].frame,
            true,
            1,
          );
        }
      });

      // Customize materials.
      scene.materials.forEach((material) => {
        if (material instanceof PBRMaterial) {
          /* eslint-disable no-param-reassign */

          // Common material config
          material.ambientColor = Color3.White();
          material.maxSimultaneousLights = 4;
          material.specularIntensity = 200; // Enhance specular lighting.
          material.enableSpecularAntiAliasing = true;
          material.forceIrradianceInFragment = true;
          // material.usePhysicalLightFalloff = false;

          const materialConfig = materialConfigs.find(
            (config) => config.name === material.name,
          );
          if (materialConfig) {
            const {
              lightmapTextureName,
              reflectionTextureName,
              refractionTextureName,
              emissiveColorHex,
              emissiveIntensity,
              fogEnabled,
              zOffset,
              alphaDisabled,
              alphaBlendDisabled,
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

            // Reflection config
            const reflectionTexture = reflectionTextureName
              ? tasks.find(
                  (task): task is HDRCubeTextureAssetTask =>
                    task instanceof HDRCubeTextureAssetTask &&
                    task.name === reflectionTextureName,
                )?.texture
              : undefined;
            if (reflectionTexture) {
              material.reflectionTexture = reflectionTexture;
              material.reflectivityColor = Color3.White();
              material.environmentIntensity = 1.0;
            }

            // Refraction config
            const refractionTexture = refractionTextureName
              ? tasks.find(
                  (task): task is HDRCubeTextureAssetTask =>
                    task instanceof HDRCubeTextureAssetTask &&
                    task.name === refractionTextureName,
                )?.texture
              : undefined;
            if (refractionTexture) {
              material.refractionTexture = refractionTexture;
              material.indexOfRefraction = 0.9;
              material.alpha = 0;
              material.metallic = 0;
              material.roughness = 0;
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
            if (alphaBlendDisabled) {
              material.transparencyMode = Material.MATERIAL_ALPHATEST;
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

      // Configure meshes.
      meshConfigs.forEach((meshConfig) => {
        const { name, parentNodeName, animation } = meshConfig;
        const mesh = scene.getMeshByName(name);
        if (mesh) {
          // Move meshes into transform nodes.
          mesh.parent = scene.getNodeByName(parentNodeName);

          // Apply mesh animation.
          if (animation) {
            const {
              targetProperty,
              easingFunction,
              easingMode,
              framePerSecond,
              keys,
            } = animation;
            const meshAnimation = new Animation(
              `${name}_mesh_animation`,
              targetProperty,
              framePerSecond,
              Animation.ANIMATIONTYPE_FLOAT,
              Animation.ANIMATIONLOOPMODE_CYCLE,
            );
            easingFunction.setEasingMode(easingMode);
            meshAnimation.setKeys(keys);
            meshAnimation.setEasingFunction(easingFunction);
            scene.beginDirectAnimation(
              mesh,
              [meshAnimation],
              0,
              keys[keys.length - 1].frame,
              true,
              1,
            );
          }
        }
      });

      // Remove unnecessary glTF node.
      const gltfRootNode = scene.getNodeByName('__root__');
      if (gltfRootNode) {
        gltfRootNode.dispose();
      }

      // Clone meshes and lights by node.
      const room2 = room.clone('room_2', null) as typeof room;
      room2.rotation.y = Math.PI;
      const hallway2 = hallway.clone('hallway_2', null) as typeof hallway;
      hallway2.position.y = -floorHeight;

      // Copy object animations for room2 as they are not cloned at the same time.
      // On the other hand, mesh animations are applied to the newly created meshes automatically.
      scene.animationGroups.forEach((animationGroup) => {
        const { name } = animationGroup;
        if (name.startsWith('phonograph')) {
          animationGroup.clone(`${name}_2`, (oldTarget) => {
            const meshes = room2.getChildMeshes();
            const newTarget = meshes.find((mesh) =>
              mesh.name.endsWith(oldTarget.name),
            );
            return newTarget;
          });
        }
      });

      // Move all nodes into root node.
      room.parent = this.rootNode;
      room2.parent = this.rootNode;
      hallway.parent = this.rootNode;
      hallway2.parent = this.rootNode;

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

      // Play all animations.
      // For some reasons, Babylon.js plays only one animation in glTF.
      scene.animationGroups.forEach((animationGroup) => {
        if (!animationGroup.isPlaying) {
          animationGroup.play(true);
        }
      });

      this.emitter.dispatchEvent(new CustomEvent('ready'));
    };
  }

  public onAssetsLoaded(callback: (remaining: number, total: number) => void) {
    this.emitter.addEventListener('assetsLoadingProgress', () => {
      callback(this.remainingLoaded, this.totalLoaded);
    });
  }

  public onReady(callback: () => void) {
    this.emitter.addEventListener('ready', () => {
      callback();
    });
  }
}
