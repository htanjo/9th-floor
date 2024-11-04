import {
  AbstractMesh,
  Animation,
  AssetsManager,
  Color3,
  Color4,
  DirectionalLight,
  Engine,
  GPUParticleSystem,
  HDRCubeTextureAssetTask,
  Light,
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

export default class SceneManager {
  private scene: Scene;

  private camera: RouteCamera;

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

    assetsManager.onFinish = (tasks) => {
      try {
        // Rename textures from auto-generated name to task-based one.
        tasks.forEach((task) => {
          if (
            task instanceof TextureAssetTask ||
            task instanceof HDRCubeTextureAssetTask
          ) {
            // eslint-disable-next-line no-param-reassign
            task.texture.name = task.name;
          }
        });

        // Create skybox.
        const skybox = MeshBuilder.CreateBox('skybox', { size: 1000 }, scene);
        skybox.material = new StandardMaterial('skybox', scene);
        skybox.material.backFaceCulling = false;

        // Add transform nodes to group meshes, lights and particles.
        this.createAreaNodes(areaConfig);

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

        // scene.getNodeByName(getCloneName('room'))?.setEnabled(false);
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
    const { name, transform, children } = areaNodeConfig;
    const transformNode = new TransformNode(name, scene);

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
  }

  private configureAnimation(
    target: AbstractMesh | Light,
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

  private configureMesh(meshConfig: MeshConfig) {
    const { scene } = this;
    const { name, parentNodeName, animation } = meshConfig;
    const mesh = scene.getMeshByName(name);
    if (mesh) {
      // Replace mesh name.
      mesh.name = getOriginalName(name);

      // Enable mesh animation.
      if (animation) {
        this.configureAnimation(mesh, animation);
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

    // Enable light animation.
    if (animation) {
      this.configureAnimation(light, animation);
    }

    // Configure hierarchy and clone lights for another area.
    light.parent = scene.getNodeByName(getOriginalName(parentNodeName));
    light.clone(
      getCloneName(name),
      scene.getNodeByName(getCloneName(parentNodeName)),
    );
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
}
