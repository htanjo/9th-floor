import {
  AssetsManager,
  Color3,
  Color4,
  DirectionalLight,
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
import { keyframes, Keyframes } from '../settings/keyframes';
import { materialConfigs, meshConfigs } from '../settings/model';
import mansionMeshUrl from '../assets/mansion.glb?url';
import lightmap1TextureUrl from '../assets/lightmap_1_0001.hdr?url';
import lightmap2TextureUrl from '../assets/lightmap_2_0001.hdr?url';
import lightmap3TextureUrl from '../assets/lightmap_3_0001.hdr?url';
import lightmap4TextureUrl from '../assets/lightmap_4_0001.hdr?url';
import lightmap5TextureUrl from '../assets/lightmap_5_0001.hdr?url';
import lightmap6TextureUrl from '../assets/lightmap_6_0001.hdr?url';
import lightmapHallwayTextureUrl from '../assets/lightmap_hallway_0001.hdr?url';
import environmentTextureUrl from '../assets/environment.jpg';

export default class MainScene {
  public scene: Scene;

  public camera: RouteCamera;

  private moveSpeed = 0.005; // Number of frames advanced by 1px scroll input.

  private keyframes: Keyframes = [];

  public get frame(): number {
    return this.camera.frame;
  }

  public set frame(frame: number) {
    this.camera.frame = frame;
  }

  public get maxFrame(): number {
    if (this.keyframes.length < 1) {
      return 0;
    }
    return this.keyframes[this.keyframes.length - 1].frame;
  }

  public constructor(scene: Scene) {
    this.scene = scene;
    this.keyframes = keyframes;
    const initialFrame = keyframes[0];
    const initialCameraPosition = new Vector3(
      initialFrame.camera?.position?.x,
      initialFrame.camera?.position?.y,
      initialFrame.camera?.position?.z,
    );
    const initialCameraRotation = new Vector3(
      initialFrame.camera?.rotation?.x,
      initialFrame.camera?.rotation?.y,
      initialFrame.camera?.rotation?.z,
    );
    this.camera = new RouteCamera('camera', initialCameraPosition, scene);
    this.camera.rotation = initialCameraRotation;
    this.camera.keyframes = keyframes;
  }

  public async start() {
    const { scene, camera } = this;
    scene.clearColor = new Color4(0, 0, 0, 0);
    scene.ambientColor = Color3.White();
    scene.fogMode = Scene.FOGMODE_EXP2;
    scene.fogColor = Color3.FromHexString('#413d38');
    scene.fogDensity = 0.025;

    // scene.getEngine().setHardwareScalingLevel(1 / window.devicePixelRatio);

    // const freeCamera = new FreeCamera(
    //   'freeCamera',
    //   new Vector3(0, 1.5, 0),
    //   scene,
    // );
    // freeCamera.rotation.y = 180 * (Math.PI / 180);
    // freeCamera.minZ = 0.01;
    // freeCamera.fov = 57 * (Math.PI / 180);
    // freeCamera.speed = 0.1;
    // scene.activeCamera = freeCamera;
    // freeCamera.attachControl(scene.getEngine().getRenderingCanvas(), true);

    // eslint-disable-next-line no-new
    new Effects(scene, [camera]);
    // new Effects(scene, [freeCamera]);

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
      // Customize materials.
      scene.materials.forEach((material) => {
        if (material instanceof PBRMaterial) {
          /* eslint-disable no-param-reassign */

          // Common material config
          material.ambientColor = Color3.White();
          material.maxSimultaneousLights = 10;
          material.specularIntensity = 100; // Enhance specular lighting.
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
              directIntensity,
              emissiveColorHex,
              emissiveIntensity,
              fogEnabled,
              zOffset,
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
              material.indexOfRefraction = 0.8;
              material.metallic = 0;
              material.roughness = 1;
              material.disableLighting = true;
            }

            // Additional custom config
            if (directIntensity !== undefined) {
              material.directIntensity = directIntensity;
            }
            if (emissiveColorHex !== undefined) {
              material.emissiveColor = Color3.FromHexString(emissiveColorHex);
            }
            if (emissiveIntensity !== undefined) {
              material.emissiveIntensity = emissiveIntensity;
            }
            if (fogEnabled !== undefined) {
              material.fogEnabled = fogEnabled;
            }
            if (zOffset !== undefined) {
              material.zOffset = zOffset;
            }
          }
          /* eslint-enable no-param-reassign */
        }
      });

      // Add specular lights.
      const windowLight1 = new PointLight(
        'window_light_1',
        new Vector3(1.2, 4.6, -17),
        scene,
      );
      windowLight1.intensity = 0.9;
      windowLight1.diffuse = Color3.FromHexString('#bcdaff');
      windowLight1.radius = 1.0;

      const windowLight2 = windowLight1.clone('window_light_2') as PointLight;
      windowLight2.position = new Vector3(-1.2, 4.6, -17);

      const wallLight1 = new PointLight(
        'wall_light_1',
        new Vector3(0, 2.2, 0.05),
        scene,
      );
      wallLight1.intensity = 0.15;
      wallLight1.diffuse = Color3.FromHexString('#ffc7a4');
      wallLight1.radius = 0.1;

      const wallLight2 = wallLight1.clone('wall_light_2') as PointLight;
      wallLight2.position = new Vector3(0, 5.8, 0.05);

      const wallLight3 = wallLight1.clone('wall_light_3') as PointLight;
      wallLight3.position = new Vector3(1.2, 2.2, -11);

      const topLight = new DirectionalLight(
        'top_light',
        new Vector3(0.4, -1.0, -0.3),
        scene,
      );
      topLight.intensity = 0.15;
      topLight.diffuse = Color3.FromHexString('#ffdfc7');
      topLight.radius = 0.2;

      const hallwayLight1 = new PointLight(
        'hallway_light_1',
        new Vector3(-3.4, 5.8, -4.05),
        scene,
      );
      hallwayLight1.intensity = 0.15;
      hallwayLight1.diffuse = Color3.FromHexString('#ffc7a4');
      hallwayLight1.radius = 0.1;

      const hallwayLight2 = hallwayLight1.clone(
        'hallway_light_2',
      ) as PointLight;
      hallwayLight2.position = new Vector3(-3.4, 5.8, 8.05);

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
    };
  }

  public inputMove(value: number) {
    let newFrame = this.frame + value * this.moveSpeed;
    if (newFrame < 0) newFrame = 0;
    if (newFrame > this.maxFrame) newFrame = this.maxFrame;
    this.frame = newFrame;
  }
}
