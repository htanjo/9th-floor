import {
  Animation,
  AssetsManager,
  Color3,
  Color4,
  DirectionalLight,
  Engine,
  GPUParticleSystem,
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
import { AreaConfig, areaConfigs } from '../settings/areas';
import { materialConfigs } from '../settings/materials';
import { floorHeight, meshConfigs } from '../settings/meshes';
import { lightConfigs } from '../settings/lights';
import { particleConfigs } from '../settings/particles';
import mansionMeshUrl from '../assets/mansion.glb?url';
import lightmap1TextureUrl from '../assets/lightmap_1_0001.hdr?url';
import lightmap2TextureUrl from '../assets/lightmap_2_0001.hdr?url';
import lightmap3TextureUrl from '../assets/lightmap_3_0001.hdr?url';
import lightmap4TextureUrl from '../assets/lightmap_4_0001.hdr?url';
import lightmap5TextureUrl from '../assets/lightmap_5_0001.hdr?url';
import lightmapHallwayTextureUrl from '../assets/lightmap_hallway_0001.hdr?url';
import environmentOutdoorTextureUrl from '../assets/environment_outdoor.hdr?url';
import environmentMirrorTextureUrl from '../assets/environment_mirror.hdr?url';
import particleDustTextureUrl from '../assets/particle_dust.png?url';
import particleFogTextureUrl from '../assets/particle_fog.png?url';

export default class SceneManager {
  private scene: Scene;

  private camera: RouteCamera;

  private worldNode: TransformNode;

  private remainingLoaded: number = 0;

  private totalLoaded: number = 0;

  private emitter: EventTarget;

  public constructor(scene: Scene) {
    this.scene = scene;
    this.camera = new RouteCamera('route_camera', this.scene);

    // this.scene.useRightHandedSystem = true;
    this.scene.clearColor = new Color4(0, 0, 0, 0);
    this.scene.ambientColor = Color3.White();
    this.scene.fogMode = Scene.FOGMODE_EXP2;
    this.scene.fogColor = Color3.FromHexString('#413d38');
    this.scene.fogDensity = 0.025;
    this.scene.imageProcessingConfiguration.toneMappingEnabled = true;

    this.worldNode = new TransformNode('world', this.scene);

    // this.scene.getEngine().setHardwareScalingLevel(1 / window.devicePixelRatio);

    // eslint-disable-next-line no-new
    new Effects(this.scene, [this.camera]);

    this.emitter = new EventTarget();
  }

  // private async initializeVr() {
  //   const { scene } = this;
  //   const floorMeshes = scene
  //     .getNodes()
  //     .filter(
  //       (node): node is Mesh =>
  //         node instanceof Mesh &&
  //         /(floor|stairs_landing|stairs_steps)/.test(node.name),
  //     );
  //   const defaultXRExperience = await scene.createDefaultXRExperienceAsync({
  //     floorMeshes,
  //   });
  //   const xrSessionManager = defaultXRExperience.baseExperience.sessionManager;
  //   const xrCamera = new WebXRCamera('XRCamera', scene, xrSessionManager);
  //   xrCamera.setTransformationFromNonVRCamera();
  // }

  private configureAreaNode(
    transformNode: TransformNode,
    areaConfig: AreaConfig,
  ) {
    const { scene, worldNode } = this;
    const { parentNodeName, transform } = areaConfig;
    /* eslint-disable no-param-reassign */
    if (parentNodeName) {
      transformNode.parent = scene.getNodeByName(parentNodeName);
    } else {
      transformNode.parent = worldNode;
    }
    if (transform) {
      const { position, rotation, scaling } = transform;
      if (position) {
        transformNode.position = new Vector3(
          position.x,
          position.y,
          position.z,
        );
      }
      if (rotation) {
        transformNode.rotation = new Vector3(
          rotation.x,
          rotation.y,
          rotation.z,
        );
      }
      if (scaling) {
        transformNode.scaling = new Vector3(scaling.x, scaling.y, scaling.z);
      }
    }
    /* eslint-enable no-param-reassign */
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
    const { worldNode } = this;
    this.camera.updateRoute(offset, invert);
    worldNode.position.y = offset * floorHeight;
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
    assetsManager.addTextureTask(
      'particle_dust_texture',
      particleDustTextureUrl,
    );
    assetsManager.addTextureTask('particle_fog_texture', particleFogTextureUrl);
    assetsManager.load();
    assetsManager.onProgress = (remaining, total) => {
      this.remainingLoaded = remaining;
      this.totalLoaded = total;
      this.emitter.dispatchEvent(new CustomEvent('assetsLoadingProgress'));
    };

    assetsManager.onFinish = (tasks) => {
      try {
        const { maxAnisotropy } = scene.getEngine().getCaps();

        // Create skybox.
        const skybox = MeshBuilder.CreateBox('skybox', { size: 1000 }, scene);
        skybox.material = new StandardMaterial('skybox', scene);
        skybox.material.backFaceCulling = false;
        skybox.parent = this.worldNode; // If skybox is visible from window, don't include it in worldNode.

        // Add transform nodes to group meshes and lights.
        const areaNodes: { [key: string]: TransformNode } = {};
        areaConfigs.forEach((areaConfig) => {
          const { name, cloneSource } = areaConfig;
          if (cloneSource === undefined) {
            const node = new TransformNode(name, scene);
            this.configureAreaNode(node, areaConfig);
            areaNodes[name] = node;
          }
        });

        // Create specular lights.
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
                material.albedoTexture.anisotropicFilteringLevel =
                  maxAnisotropy;
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
        areaConfigs.forEach((areaConfig) => {
          const { name, cloneSource } = areaConfig;
          if (cloneSource !== undefined) {
            const node = areaNodes[cloneSource].clone(
              name,
              null,
            ) as TransformNode;
            this.configureAreaNode(node, areaConfig);
            areaNodes[name] = node;
          }
        });

        // Clone object animations to room2 as they are not cloned automatically.
        // On the other hand, mesh animations are applied to the newly created meshes without setup.
        scene.animationGroups.forEach((animationGroup) => {
          const { name } = animationGroup;
          if (name.startsWith('phonograph')) {
            animationGroup.clone(`clone.${name}`, (oldTarget) => {
              const newTarget = areaNodes['clone.room']
                .getChildMeshes()
                .find((mesh) => mesh.name.endsWith(oldTarget.name));
              return newTarget;
            });
          }
        });

        // Configure lights.
        scene.lights.forEach((light) => {
          // Limit effective lights based on config and node groups.
          /* eslint-disable no-param-reassign */
          const baseLightName = light.name.split('.').pop() as string; // name: '<parentNodeName>.<baseLightName>'
          const includedMeshNames = meshConfigs
            .filter((config) =>
              config.effectiveLightNames.includes(baseLightName),
            )
            .map((config) => config.name);
          const parentNode = light.parent;
          if (parentNode) {
            const includedMeshes = parentNode
              .getChildMeshes()
              .filter((mesh) => {
                const baseMeshName = mesh.name.split('.').pop() as string; // name: '<parentNodeName>.<baseMeshName>'
                return includedMeshNames.includes(baseMeshName);
              });
            light.includedOnlyMeshes = includedMeshes;
          }
          /* eslint-enable no-param-reassign */

          // Apply light animation.
          const lightConfig = lightConfigs.find(
            (config) => config.name === light.name.split('.').pop(),
          );
          if (lightConfig?.animation) {
            const {
              targetProperty,
              easingFunction,
              easingMode,
              framePerSecond,
              keys,
            } = lightConfig.animation;
            const lightAnimation = new Animation(
              `${light.name}_light_animation`,
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

        // Play all animations.
        // For some reasons, Babylon.js plays only one animation in glTF.
        scene.animationGroups.forEach((animationGroup) => {
          if (!animationGroup.isPlaying) {
            animationGroup.play(true);
          }
        });

        // Add particles.
        particleConfigs.forEach((config) => {
          const {
            type,
            name,
            textureName,
            capacity,
            emitRate,
            updateSpeed,
            radius,
            radiusRange,
            minDirection,
            maxDirection,
            minSize,
            maxSize,
            minScaleX,
            minScaleY,
            maxScaleX,
            maxScaleY,
            minEmitPower,
            maxEmitPower,
            minLifeTime,
            maxLifeTime,
            minAngularSpeed,
            maxAngularSpeed,
            gravity,
          } = config;

          // Configure common particle settings.
          const particleSystem = new GPUParticleSystem(
            name,
            { capacity },
            scene,
          );
          // const particleSystem = new ParticleSystem(name, capacity, scene);
          particleSystem.emitRate = emitRate;
          particleSystem.updateSpeed = updateSpeed;
          const sphereEmitter = particleSystem.createDirectedSphereEmitter(
            radius,
            new Vector3(minDirection.x, minDirection.y, minDirection.z),
            new Vector3(maxDirection.x, maxDirection.y, maxDirection.z),
          );
          sphereEmitter.radiusRange = radiusRange;
          particleSystem.minSize = minSize;
          particleSystem.maxSize = maxSize;
          particleSystem.minScaleX = minScaleX;
          particleSystem.maxScaleX = maxScaleX;
          particleSystem.minScaleY = minScaleY;
          particleSystem.maxScaleY = maxScaleY;
          particleSystem.minEmitPower = minEmitPower;
          particleSystem.maxEmitPower = maxEmitPower;
          particleSystem.minLifeTime = minLifeTime;
          particleSystem.maxLifeTime = maxLifeTime;
          particleSystem.minAngularSpeed = minAngularSpeed;
          particleSystem.maxAngularSpeed = maxAngularSpeed;
          particleSystem.gravity = new Vector3(gravity.x, gravity.y, gravity.z);

          // Configure lifetime color.
          particleSystem.addColorGradient(0, new Color4(0, 0, 0, 1));
          particleSystem.addColorGradient(0.3, new Color4(1, 1, 1, 1));
          particleSystem.addColorGradient(0.49, new Color4(0.4, 0.4, 0.4, 1));
          particleSystem.addColorGradient(0.5, new Color4(1, 1, 1, 1));
          particleSystem.addColorGradient(0.59, new Color4(0.4, 0.4, 0.4, 1));
          particleSystem.addColorGradient(0.7, new Color4(1, 1, 1, 1));
          particleSystem.addColorGradient(1, new Color4(0, 0, 0, 1));

          // Texture
          const particleTexture =
            tasks.find(
              (task): task is TextureAssetTask =>
                task instanceof TextureAssetTask && task.name === textureName,
            )?.texture || null;
          particleSystem.particleTexture = particleTexture;

          if (type === 'dynamic') {
            // Particles move around the camera dynamically.
            particleSystem.isLocal = false; // Particles follow the emitter with delay. (default)
            particleSystem.direction1 = new Vector3(
              minDirection.x,
              minDirection.y,
              minDirection.z,
            );
            particleSystem.direction2 = new Vector3(
              maxDirection.x,
              maxDirection.y,
              maxDirection.z,
            );
            scene.registerBeforeRender(() => {
              particleSystem.emitter =
                scene.activeCamera?.position || Vector3.Zero();
            });
          } else if (type === 'static') {
            // Particles emitted from static placeholder.
            particleSystem.isLocal = true; // Particles follows the emitter without delay.
            const { position, parentNodeName } = config;
            const emitter = MeshBuilder.CreateBox(
              `${name}_emitter`,
              { size: 0 },
              scene,
            );
            emitter.isVisible = false;
            emitter.position = new Vector3(position.x, position.y, position.z);
            emitter.parent = scene.getNodeByName(parentNodeName);
            particleSystem.emitter = emitter;
          }

          // Play particle effects.
          particleSystem.preWarmCycles = 60;
          particleSystem.preWarmStepOffset = 10;
          particleSystem.start();
        });

        // areaNodes['clone.room'].setEnabled(false);
        // this.initializeVr();

        // Dispatch onReady event for listeners.
        this.emitter.dispatchEvent(new CustomEvent('ready'));
      } catch (error) {
        console.error(error);
        throw error;
      }
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
