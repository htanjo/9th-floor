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
  Vector3,
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import RouteCamera from './RouteCamera';
import Effects from './Effects';
import { materialConfigs, meshConfigs } from '../settings/models';
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

      // Add specular lights.
      const windowCompositeLight = new PointLight(
        'window_composite_light',
        new Vector3(0, 4.6, -18),
        scene,
      );
      windowCompositeLight.intensity = 3.0;
      windowCompositeLight.diffuse = Color3.FromHexString('#85bcff');
      windowCompositeLight.radius = 1.6;

      const windowLeftLight = new PointLight(
        'window_left_light',
        new Vector3(1.3, 5, -18),
        scene,
      );
      windowLeftLight.intensity = 2.0;
      windowLeftLight.diffuse = Color3.FromHexString('#85bcff');
      windowLeftLight.radius = 1.0;

      const windowRightLight = windowLeftLight.clone(
        'window_right_light',
      ) as PointLight;
      windowRightLight.position = new Vector3(-1.3, 5, -18);

      const windowSunLight = new PointLight(
        'window_sun_light',
        new Vector3(-2, 8, -24),
        scene,
      );
      windowSunLight.intensity = 0.4;
      windowSunLight.diffuse = Color3.FromHexString('#fff6e7');
      windowSunLight.radius = 1.6;

      const floor1Light = new PointLight(
        'floor_1_light',
        new Vector3(0, 2.2, 0.05),
        scene,
      );
      floor1Light.intensity = 0.2;
      floor1Light.diffuse = Color3.FromHexString('#ffc7a4');
      floor1Light.radius = 0.1;

      const floor2Light = floor1Light.clone('floor_2_light') as PointLight;
      floor2Light.position = new Vector3(0, 5.8, 0.05);

      const stairsLight = floor1Light.clone('stairs_light') as PointLight;
      stairsLight.position = new Vector3(1.2, 2.2, -11);

      const tableLight = new PointLight(
        'table_light',
        new Vector3(-1.7, 1.1, -7.2),
        scene,
      );
      tableLight.intensity = 0.1;
      tableLight.diffuse = Color3.FromHexString('#ffb575');
      tableLight.radius = 0.1;

      const topLight = new DirectionalLight(
        'top_light',
        new Vector3(0.4, -1.0, -0.3),
        scene,
      );
      topLight.intensity = 0.15;
      topLight.diffuse = Color3.FromHexString('#ffdfc7');
      topLight.radius = 0.2;

      const hallwayFrontLight = new PointLight(
        'hallway_front_light',
        new Vector3(-3.4, 5.8, -4.05),
        scene,
      );
      hallwayFrontLight.intensity = 0.25;
      hallwayFrontLight.diffuse = Color3.FromHexString('#ffc7a4');
      hallwayFrontLight.radius = 0.1;

      const hallwayBackLight = hallwayFrontLight.clone(
        'hallway_back_light',
      ) as PointLight;
      hallwayBackLight.position = new Vector3(-3.4, 5.8, 8.05);

      scene.lights.forEach((light) => {
        /* eslint-disable no-param-reassign */
        const includedMeshNames = meshConfigs
          .filter((config) => config.effectiveLightNames.includes(light.name))
          .map((config) => config.name);
        const includedMeshes = scene.meshes.filter((mesh) =>
          includedMeshNames.includes(mesh.name),
        );
        light.includedOnlyMeshes = includedMeshes;
        /* eslint-enable no-param-reassign */
      });

      // Trigger callback finally.
      callback();
    };
  }
}