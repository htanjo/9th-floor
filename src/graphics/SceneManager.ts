import {
  AbstractMesh,
  Animation,
  AssetsManager,
  BaseTexture,
  Color3,
  Color4,
  DirectionalLight,
  Engine,
  GPUParticleSystem,
  Light,
  Material,
  MeshBuilder,
  PBRMaterial,
  PointLight,
  Scene,
  TransformNode,
  Vector3,
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import RouteCamera from './RouteCamera';
import Effects from './Effects';
import {
  AreaConfig,
  areaConfig,
  getBaseName,
  getCloneName,
  getCorrespondingName,
  getOriginalName,
  topLevelNodeName,
} from '../settings/areas';
import { MaterialConfig, materialConfigs } from '../settings/materials';
import {
  floorHeight,
  MeshConfig,
  MeshConfigs,
  meshConfigs,
} from '../settings/meshes';
import { LightConfig, lightConfigs } from '../settings/lights';
import { ParticleConfig, particleConfigs } from '../settings/particles';
import { AnimationConfig } from '../settings/animations';
import { assetConfigs } from '../settings/assets';
import { TextureConfig, textureConfigs } from '../settings/textures';

export default class SceneManager {
  private scene: Scene;

  private camera: RouteCamera;

  private remainingLoaded: number = 0;

  private totalLoaded: number = 0;

  private areaName: string = '';

  private hidableAreas: AreaConfig[] = [];

  private anomalyCleanupFunction: (() => void) | null = null;

  private emitter: EventTarget;

  public constructor(scene: Scene) {
    this.scene = scene;
    this.camera = new RouteCamera('route_camera', this.scene);

    // this.scene.useRightHandedSystem = true;
    this.scene.clearColor = Color4.FromHexString('#0c0a08ff');
    this.scene.ambientColor = Color3.White();
    this.scene.fogMode = Scene.FOGMODE_EXP2;
    this.scene.fogColor = Color3.FromHexString('#413d38');
    this.scene.fogDensity = 0.025;
    this.scene.imageProcessingConfiguration.toneMappingEnabled = true;

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
    const { scene } = this;
    this.camera.updateRoute(offset, invert);
    const topLevelNode = scene.getNodeByName(topLevelNodeName);
    if (topLevelNode instanceof TransformNode) {
      topLevelNode.position.y = offset * floorHeight;
    }
  }

  public applyArea(name: string) {
    const { scene, hidableAreas } = this;
    // When the current area is changed, update visible nodes.
    if (name !== this.areaName) {
      this.areaName = name;
      hidableAreas.forEach((config) => {
        const hidableNode = scene.getNodeByName(config.name);
        if (hidableNode) {
          hidableNode.setEnabled(false);
        }
      });
      const currentAreaConfig = hidableAreas.find(
        (config) => config.name === this.areaName,
      );
      currentAreaConfig?.visibleAreaNames?.forEach((areaName) => {
        const visibleNode = scene.getNodeByName(areaName);
        if (visibleNode) {
          visibleNode.setEnabled(true);
        }
      });
    }
  }

  public applyAnomaly(name: string | null) {
    this.cleanupAnomaly();
    if (name !== null) {
      this.causeAnomaly(name);
    }
  }

  public applyFloor(number: number) {
    const { scene } = this;
    const signboardMeshes = scene.meshes.filter((mesh) =>
      mesh.name.startsWith('signboard_front_'),
    );
    signboardMeshes.forEach((mesh) => {
      /* eslint-disable no-param-reassign */
      if (getBaseName(mesh.name) === `signboard_front_${number}`) {
        mesh.isVisible = true;
      } else {
        mesh.isVisible = false;
      }
      /* eslint-enable no-param-reassign */
    });
  }

  public loadAssets() {
    const { scene } = this;
    const assetsManager = new AssetsManager(scene);

    // Hide built-in loading screen.
    assetsManager.useDefaultLoadingScreen = false;

    // Load assets.
    assetConfigs.forEach((assetConfig) => {
      const { type, name, url } = assetConfig;
      switch (type) {
        case 'mesh':
          assetsManager.addMeshTask(name, undefined, url, '');
          break;
        case 'texture':
          assetsManager.addTextureTask(name, url, undefined, false);
          break;
        case 'hdrCubeTexture':
          assetsManager.addHDRCubeTextureTask(name, url, 512);
          break;
        // no default
      }
    });
    assetsManager.load();

    assetsManager.onProgress = (remaining, total) => {
      this.remainingLoaded = remaining;
      this.totalLoaded = total;
      this.emitter.dispatchEvent(new CustomEvent('assetsLoadingProgress'));
    };

    assetsManager.onFinish = () => {
      try {
        // Add transform nodes to group meshes, lights and particles.
        this.createAreaNodes(areaConfig);

        // Configure textures loaded by assetsManager.
        textureConfigs.forEach((textureConfig) => {
          this.configureTexture(textureConfig);
        });

        // Customize existing materials based on the config.
        materialConfigs.forEach((materialConfig) => {
          this.configureMaterial(materialConfig);
        });

        // Configure meshes and move into corresponding node.
        meshConfigs.forEach((meshConfig) => {
          this.configureMesh(meshConfig);
        });

        // Remove unnecessary glTF node.
        const gltfRootNode = scene.getNodeByName('__root__');
        if (gltfRootNode) {
          gltfRootNode.dispose();
        }

        // Create lights for specular lighting.
        lightConfigs.forEach((lightConfig) => {
          this.createLight(lightConfig);
        });
        this.configureEffectiveLights(meshConfigs);
        // this.configureLightAnimations(lightConfigs);

        // HOTFIX: Play all animations.
        // 1. Clone object-based animations as they are not automatically cloned with the mesh.
        // On the other hand, vertex animations are copied to the newly created meshes.
        scene.animationGroups.forEach((animationGroup) => {
          const { name } = animationGroup;
          if (name.startsWith('phonograph')) {
            animationGroup.clone(getCloneName(name), (oldTarget) =>
              scene.getMeshByName(getCloneName(oldTarget.name)),
            );
          }
        });
        // 2. For some reasons, Babylon.js plays only one vertex animation in glTF.
        // Other animations have to be started manually.
        scene.animationGroups.forEach((animationGroup) => {
          if (!animationGroup.isPlaying) {
            animationGroup.play(true);
          }
        });

        // Add particles.
        particleConfigs.forEach((particleConfig) =>
          this.createParticle(particleConfig),
        );

        // this.initializeVr();

        // Dispatch onReady event for listeners.
        this.emitter.dispatchEvent(new CustomEvent('ready'));
      } catch (error) {
        // eslint-disable-next-line no-console
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

  private createAreaNodes(areaNodeConfig: AreaConfig, parentNodeName?: string) {
    const { scene } = this;
    const { name, hidable, transform, children } = areaNodeConfig;
    const transformNode = new TransformNode(name, scene);

    if (hidable) {
      this.hidableAreas.push(areaNodeConfig);
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

    if (parentNodeName !== undefined) {
      transformNode.parent = scene.getNodeByName(parentNodeName);
    }

    // Crate child transform nodes recursively.
    if (children) {
      children.forEach((childNodeConfig) =>
        this.createAreaNodes(childNodeConfig, name),
      );
    }
  }

  private configureAnimation(
    target: BaseTexture | Material | Light,
    animationConfig: AnimationConfig,
  ) {
    const { scene } = this;
    const { targetProperty, easingFunction, easingMode, framePerSecond, keys } =
      animationConfig;
    if (!targetProperty) {
      return;
    }
    const targetType = target.constructor.name.toLowerCase();
    const meshAnimation = new Animation(
      `${target.name}_${targetType}_animation`,
      targetProperty,
      framePerSecond,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE,
    );
    easingFunction.setEasingMode(easingMode);
    meshAnimation.setKeys(keys);
    meshAnimation.setEasingFunction(easingFunction);
    scene.beginDirectAnimation(
      target,
      [meshAnimation],
      0,
      keys[keys.length - 1].frame,
      true,
      1,
    );
  }

  private configureTexture(textureConfig: TextureConfig) {
    const { scene } = this;
    const { name, originalName, animation } = textureConfig;
    const texture = scene.getTextureByName(originalName);
    if (!texture) {
      return;
    }

    // Override texture name.
    texture.name = name;

    // Enable material animation.
    if (animation) {
      this.configureAnimation(texture, animation);
    }
  }

  private configureMaterial(materialConfig: MaterialConfig) {
    const { scene } = this;
    const {
      name,
      lightmapTextureName,
      reflectionTextureName,
      refractionTextureName,
      emissiveColorHex,
      emissiveIntensity,
      fogEnabled,
      zOffset,
      alphaDisabled,
      alphaBlendDisabled,
      animation,
    } = materialConfig;
    const material = scene.getMaterialByName(name);
    if (!material || !(material instanceof PBRMaterial)) {
      return;
    }
    const { maxAnisotropy } = scene.getEngine().getCaps();

    // Common material config
    material.ambientColor = Color3.White();
    material.maxSimultaneousLights = 4;
    material.specularIntensity = 200; // Enhance specular lighting.
    material.enableSpecularAntiAliasing = true;
    material.forceIrradianceInFragment = true;
    // material.usePhysicalLightFalloff = false;

    // Lightmap config
    if (lightmapTextureName) {
      const lightmapTexture = scene.getTextureByName(lightmapTextureName);
      if (lightmapTexture) {
        material.lightmapTexture = lightmapTexture;
        material.lightmapTexture.coordinatesIndex = 1; // Use UV2.
        material.lightmapTexture.level = 1.0;
        material.useLightmapAsShadowmap = true;
      }
    }

    // Reflection config
    if (reflectionTextureName) {
      const reflectionTexture = scene.getTextureByName(reflectionTextureName);
      if (reflectionTexture) {
        material.reflectionTexture = reflectionTexture;
        material.reflectivityColor = Color3.White();
        material.environmentIntensity = 1.0;
      }
    }

    // Refraction config
    if (refractionTextureName) {
      const refractionTexture = scene.getTextureByName(refractionTextureName);
      if (refractionTexture) {
        material.refractionTexture = refractionTexture;
        material.indexOfRefraction = 0.9;
        material.alpha = 0;
        material.metallic = 0;
        material.roughness = 0;
        material.disableLighting = true;
      }
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

    // Enable material animation.
    if (animation) {
      this.configureAnimation(material, animation);
    }
  }

  private configureMesh(meshConfig: MeshConfig) {
    const { scene } = this;
    const { name, parentNodeName, isVisible } = meshConfig;
    const mesh = scene.getMeshByName(name);
    if (mesh) {
      // Replace mesh name.
      mesh.name = getOriginalName(name);

      // Hide anomaly meshes.
      if (isVisible !== undefined) {
        mesh.isVisible = isVisible;
      }

      // Configure hierarchy and clone meshes for another area.
      mesh.parent = scene.getNodeByName(getOriginalName(parentNodeName));
      mesh.clone(
        getCloneName(name),
        scene.getNodeByName(getCloneName(parentNodeName)),
      );
    }
  }

  private createLight(lightConfig: LightConfig) {
    const { scene } = this;
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
          getOriginalName(name),
          new Vector3(position.x, position.y, position.z),
          scene,
        );
        break;
      case 'PointLight':
      default:
        light = new PointLight(
          getOriginalName(name),
          new Vector3(position.x, position.y, position.z),
          scene,
        );
    }
    light.intensity = intensity;
    light.diffuse = Color3.FromHexString(diffuseColorHex);
    light.radius = radius;
    light.shadowEnabled = false;

    // Configure hierarchy and clone lights for another area.
    light.parent = scene.getNodeByName(getOriginalName(parentNodeName));
    const clonedLight = light.clone(
      getCloneName(name),
      scene.getNodeByName(getCloneName(parentNodeName)),
    ) as typeof light;

    // Enable light animation.
    if (animation) {
      this.configureAnimation(light, animation);
      this.configureAnimation(clonedLight, animation);
    }
  }

  private configureEffectiveLights(meshLightConfigs: MeshConfigs) {
    const { scene } = this;
    scene.lights.forEach((light) => {
      // Limit effective lights based on config and node groups.
      const includedMeshNames = meshLightConfigs
        .filter((config) =>
          config.effectiveLightNames.includes(getBaseName(light.name)),
        )
        .map((config) => getCorrespondingName(config.name, light.name));
      const includeMeshes = scene.meshes.filter((mesh) =>
        includedMeshNames.includes(mesh.name),
      );
      // eslint-disable-next-line no-param-reassign
      light.includedOnlyMeshes = includeMeshes;
    });
  }

  private createParticle(particleConfig: ParticleConfig, clone?: boolean) {
    const { scene } = this;
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
    } = particleConfig;

    // Configure common particle settings.
    const particleSystemName = clone
      ? getCloneName(name)
      : getOriginalName(name);
    const particleSystem = new GPUParticleSystem(
      particleSystemName,
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
    const particleTexture = scene.getTextureByName(textureName);
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
        particleSystem.emitter = scene.activeCamera?.position || Vector3.Zero();
      });
    } else if (type === 'static') {
      // Particles emitted from static placeholder.
      particleSystem.isLocal = true; // Particles follows the emitter without delay.
      const { position, parentNodeName } = particleConfig;
      const emitter = MeshBuilder.CreateBox(
        `${name}_emitter`,
        { size: 0 },
        scene,
      );
      emitter.isVisible = false;
      emitter.position = new Vector3(position.x, position.y, position.z);
      emitter.parent = scene.getNodeByName(
        getCorrespondingName(parentNodeName, particleSystemName),
      );
      particleSystem.emitter = emitter;
    }

    // Play particle effects.
    particleSystem.preWarmCycles = 60;
    particleSystem.preWarmStepOffset = 10;
    particleSystem.start();

    // Recreate static particles because particleSystem.clone() didn't work as expected.
    if (type === 'static' && !clone) {
      this.createParticle(particleConfig, true);
    }
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

  private cleanupAnomaly() {
    if (this.anomalyCleanupFunction) {
      this.anomalyCleanupFunction();
    }
  }

  private causeAnomaly(name: string) {
    switch (name) {
      case 'overall_red':
        this.causeAnomalyOverallRed();
        break;
      case 'phonograph_large':
        this.causeAnomalyPhonographLarge();
        break;
      case 'sword_stand':
        this.causeAnomalyAppear(['sword_anomaly'], ['sword']);
        break;
      case 'cat_ghost':
        this.causeAnomalyCatGhost();
        break;
      case 'picture_eyes':
        this.causeAnomalyAppear(['picture_canvas_anomaly']);
        break;
      case 'floor_none':
        this.causeAnomalyAppear(
          ['floor_none_anomaly'],
          ['floor_1_center', 'floor_1_medallion', 'decal_floor_1'],
        );
        break;
      case 'chair_outside':
        this.causeAnomalyAppear([
          'chair_outside_anomaly',
          'chair_outside_anomaly_shadow',
        ]);
        break;
      // no default
    }
  }

  private causeAnomalyAppear(
    anomalyMeshNames: string[],
    flipMeshNames?: string[],
  ) {
    const { scene } = this;
    const anomalyMeshes = scene.meshes.filter((mesh) =>
      anomalyMeshNames.includes(getBaseName(mesh.name)),
    );
    const flipMeshes = flipMeshNames
      ? scene.meshes.filter((mesh) =>
          flipMeshNames.includes(getBaseName(mesh.name)),
        )
      : [];
    /* eslint-disable no-param-reassign */
    anomalyMeshes.forEach((mesh) => {
      mesh.isVisible = true;
    });
    flipMeshes.forEach((mesh) => {
      mesh.isVisible = false;
    });
    this.anomalyCleanupFunction = () => {
      anomalyMeshes.forEach((mesh) => {
        mesh.isVisible = false;
      });
      flipMeshes.forEach((mesh) => {
        mesh.isVisible = true;
      });
    };
    /* eslint-enable no-param-reassign */
  }

  private causeAnomalyOverallRed() {
    const { scene } = this;
    const originalAmbientColors: { [key: string]: Color3 } = {};
    const originalAlbedoColors: { [key: string]: Color3 } = {};
    const originalAlbedoTextures: { [key: string]: BaseTexture } = {};
    const originalLightDiffuse: { [key: string]: Color3 } = {};
    /* eslint-disable no-param-reassign */
    scene.materials.forEach((material) => {
      if (
        material instanceof PBRMaterial &&
        !material.name.startsWith('hallway_')
      ) {
        originalAmbientColors[material.id] = material.ambientColor;
        if (
          [
            'signboard',
            'cat',
            'door',
            'pillar',
            'ceiling_edge',
            'window_frame',
          ].includes(material.name)
        ) {
          material.ambientColor = Color3.FromHexString('#ff7777');
        } else {
          material.ambientColor = Color3.FromHexString('#ff3333');
        }
        if (material.name === 'mirror_surface') {
          originalAlbedoColors[material.id] = material.albedoColor;
          material.albedoColor = Color3.FromHexString('#ff7766');
        }
        if (material.name === 'lamp_shade' && material.albedoTexture) {
          originalAlbedoColors[material.id] = material.albedoColor;
          originalAlbedoTextures[material.id] = material.albedoTexture;
          material.albedoColor = Color3.FromHexString('cc30000');
          material.albedoTexture = null;
        }
      }
    });
    scene.lights.forEach((light) => {
      if (!light.name.startsWith('hallway_')) {
        originalLightDiffuse[light.id] = light.diffuse;
        light.diffuse = Color3.FromHexString('#ffcccc');
      }
    });
    this.anomalyCleanupFunction = () => {
      scene.materials.forEach((material) => {
        if (
          material instanceof PBRMaterial &&
          !material.name.startsWith('hallway_')
        ) {
          material.ambientColor = originalAmbientColors[material.id];
          if (material.name === 'mirror_surface') {
            material.albedoColor = originalAlbedoColors[material.id];
          }
          if (material.name === 'lamp_shade' && material.albedoTexture) {
            material.albedoColor = originalAlbedoColors[material.id];
            material.albedoTexture = originalAlbedoTextures[material.id];
          }
        }
      });
      scene.lights.forEach((light) => {
        if (!light.name.startsWith('hallway_')) {
          light.diffuse = originalLightDiffuse[light.id];
        }
      });
    };
    /* eslint-enable no-param-reassign */
  }

  private causeAnomalyPhonographLarge() {
    const { scene } = this;
    const phonographDiskMeshes = scene.meshes.filter(
      (mesh) => getBaseName(mesh.name) === 'phonograph_disk',
    );
    /* eslint-disable no-param-reassign */
    phonographDiskMeshes.forEach((mesh) => {
      mesh.scaling = new Vector3(2, 1, 2);
    });
    this.anomalyCleanupFunction = () => {
      phonographDiskMeshes.forEach((mesh) => {
        mesh.scaling = new Vector3(1, 1, 1);
      });
    };
    /* eslint-enable no-param-reassign */
  }

  private causeAnomalyCatGhost() {
    const { scene } = this;
    const catMeshes = scene.meshes.filter((mesh) =>
      ['cat'].includes(getBaseName(mesh.name)),
    );
    const catGhostMeshes = catMeshes.map(
      (mesh) => mesh.clone(`${mesh.name}_ghost`, mesh.parent) as AbstractMesh,
    );
    const animations: { [key: string]: () => void } = {};
    const minGhostAlpha = 0.2;
    const maxGhostAlpha = 0.7;
    const minFloatDistance = 0.05;
    const maxFloatDistance = 0.2;
    const baseFloatUpSpeed = 0.005;
    const baseFloatDownSpeed = 0.02;
    const minSpeedRate = 0.02;
    function getFloatDistance() {
      const distance =
        minFloatDistance +
        Math.random() * (maxFloatDistance - minFloatDistance);
      return distance;
    }
    let floatUp = true;
    let floatDistance = getFloatDistance();
    /* eslint-disable no-param-reassign */
    catGhostMeshes.forEach((mesh) => {
      mesh.visibility = 0.9999;
      if (mesh.material instanceof PBRMaterial) {
        mesh.material.alphaMode = Engine.ALPHA_COMBINE;
        mesh.material.alpha = minGhostAlpha;
        const animateCatGhost = () => {
          let speedRate = floatUp
            ? (floatDistance - mesh.position.y) / floatDistance
            : mesh.position.y / floatDistance;
          if (speedRate < minSpeedRate) {
            speedRate = minSpeedRate;
          }
          const moveDistance = floatUp
            ? baseFloatUpSpeed * speedRate
            : -baseFloatDownSpeed * speedRate;
          mesh.position.y += moveDistance;
          if (mesh.material instanceof PBRMaterial) {
            mesh.material.alpha =
              minGhostAlpha +
              (maxGhostAlpha - minGhostAlpha) *
                (mesh.position.y / floatDistance);
          }
          if (mesh.position.y >= floatDistance) {
            mesh.position.y = floatDistance;
            floatUp = false;
          } else if (mesh.position.y <= 0) {
            mesh.position.y = 0;
            floatUp = true;
            floatDistance = getFloatDistance();
          }
        };
        animations[mesh.id] = animateCatGhost;
        scene.registerBeforeRender(animateCatGhost);
      }
    });
    this.anomalyCleanupFunction = () => {
      catGhostMeshes.forEach((mesh) => {
        scene.unregisterBeforeRender(animations[mesh.id]);
        mesh.dispose();
      });
    };
    /* eslint-enable no-param-reassign */
  }
}
