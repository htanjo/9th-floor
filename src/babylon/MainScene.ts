import {
  AssetsManager,
  Color3,
  Color4,
  DirectionalLight,
  // FreeCamera,
  PBRMaterial,
  PointLight,
  Scene,
  Vector3,
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import RouteCamera from './RouteCamera';
import { keyframes, Keyframes } from '../settings/keyframes';
import mansionMeshUrl from '../assets/mansion.glb?url';
import lightmap1TextureUrl from '../assets/lightmap_1_0000.hdr?url';
import lightmap2TextureUrl from '../assets/lightmap_2_0000.hdr?url';
import lightmap3TextureUrl from '../assets/lightmap_3_0000.hdr?url';
import lightmap4TextureUrl from '../assets/lightmap_4_0000.hdr?url';
import lightmap5TextureUrl from '../assets/lightmap_5_0000.hdr?url';
import environmentTextureUrl from '../assets/environment.jpg';
import Effects from './Effects';

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
    assetsManager.addMeshTask('mansionMesh', undefined, mansionMeshUrl, '');
    const lightmap1TextureTask = assetsManager.addTextureTask(
      'lightmap1Texture',
      lightmap1TextureUrl,
      undefined,
      false,
    );
    const lightmap2TextureTask = assetsManager.addTextureTask(
      'lightmap2Texture',
      lightmap2TextureUrl,
      undefined,
      false,
    );
    const lightmap3TextureTask = assetsManager.addTextureTask(
      'lightmap3Texture',
      lightmap3TextureUrl,
      undefined,
      false,
    );
    const lightmap4TextureTask = assetsManager.addTextureTask(
      'lightmap4Texture',
      lightmap4TextureUrl,
      undefined,
      false,
    );
    const lightmap5TextureTask = assetsManager.addTextureTask(
      'lightmap5Texture',
      lightmap5TextureUrl,
      undefined,
      false,
    );
    const environmentTextureTask =
      assetsManager.addEquiRectangularCubeTextureAssetTask(
        'environmentTexture',
        environmentTextureUrl,
        512,
      );
    assetsManager.load();

    assetsManager.onFinish = () => {
      scene.materials.forEach((material) => {
        const pbrMaterial = material as PBRMaterial;
        pbrMaterial.maxSimultaneousLights = 10;
        pbrMaterial.specularIntensity = 100; // Enhance specular lighting.
        // pbrMaterial.enableSpecularAntiAliasing = true;
        // pbrMaterial.usePhysicalLightFalloff = false;
        switch (pbrMaterial.name) {
          case 'ceiling':
          case 'floor':
          case 'wall':
            pbrMaterial.lightmapTexture = lightmap1TextureTask.texture;
            pbrMaterial.lightmapTexture.coordinatesIndex = 1; // Use UV2.
            pbrMaterial.useLightmapAsShadowmap = true;
            pbrMaterial.ambientColor = Color3.White();
            break;
          case 'stairs_back':
          case 'stairs_base':
          case 'stairs_runner':
          case 'wood':
            pbrMaterial.lightmapTexture = lightmap2TextureTask.texture;
            pbrMaterial.lightmapTexture.coordinatesIndex = 1; // Use UV2.
            pbrMaterial.useLightmapAsShadowmap = true;
            pbrMaterial.ambientColor = Color3.White();
            break;
          case 'railing_baluster':
          case 'railing_handrail':
          case 'railing_newel':
            pbrMaterial.lightmapTexture = lightmap3TextureTask.texture;
            pbrMaterial.lightmapTexture.coordinatesIndex = 1; // Use UV2.
            pbrMaterial.useLightmapAsShadowmap = true;
            pbrMaterial.ambientColor = Color3.White();
            break;
          case 'cornice':
          case 'door':
          case 'pillar':
          case 'railing_base':
          case 'wainscot':
            pbrMaterial.lightmapTexture = lightmap4TextureTask.texture;
            pbrMaterial.lightmapTexture.coordinatesIndex = 1; // Use UV2.
            pbrMaterial.useLightmapAsShadowmap = true;
            pbrMaterial.ambientColor = Color3.White();
            break;
          case 'window_frame':
            pbrMaterial.lightmapTexture = lightmap4TextureTask.texture;
            pbrMaterial.lightmapTexture.coordinatesIndex = 1; // Use UV2.
            pbrMaterial.useLightmapAsShadowmap = true;
            pbrMaterial.ambientColor = Color3.White();
            pbrMaterial.directIntensity = 0.15;
            break;
          case 'lamp_base':
            pbrMaterial.lightmapTexture = lightmap5TextureTask.texture;
            pbrMaterial.lightmapTexture.coordinatesIndex = 1; // Use UV2.
            pbrMaterial.useLightmapAsShadowmap = true;
            pbrMaterial.ambientColor = Color3.White();
            break;
          case 'lamp_shade':
            pbrMaterial.ambientColor = Color3.FromHexString('#ffffff');
            pbrMaterial.emissiveIntensity = 4;
            break;
          case 'window_glass':
            pbrMaterial.disableLighting = true;
            pbrMaterial.refractionTexture = environmentTextureTask.texture;
            pbrMaterial.indexOfRefraction = 0.8;
            pbrMaterial.metallic = 0;
            pbrMaterial.roughness = 1;
            pbrMaterial.emissiveColor = Color3.FromHexString('#d1e3ff');
            pbrMaterial.emissiveIntensity = 0.5;
            pbrMaterial.fogEnabled = false;
            pbrMaterial.zOffset = 0.1; // Avoid z-fighting.
            break;
          default:
            pbrMaterial.ambientColor = Color3.White();
        }
      });

      // Add specular lights.
      const windowLight1 = new PointLight(
        'window_light_1',
        new Vector3(1.2, 4.2, -17),
        scene,
      );
      windowLight1.intensity = 1.4;
      windowLight1.diffuse = Color3.FromHexString('#bcdaff');
      windowLight1.radius = 1.0;
      const windowLight1ExcludedMeshes = scene.meshes.filter((mesh) =>
        ['floor_1'].includes(mesh.name),
      );
      windowLight1.excludedMeshes = windowLight1ExcludedMeshes;

      const windowLight2 = windowLight1.clone('window_light_2') as PointLight;
      windowLight2.position = new Vector3(-1.2, 4.2, -17);

      const wallLight1 = new PointLight(
        'wall_light_1',
        new Vector3(0, 5.8, 0.01),
        scene,
      );
      wallLight1.intensity = 0.2;
      wallLight1.diffuse = Color3.FromHexString('#ffc7a4');
      wallLight1.radius = 0.1;
      const wallLightIncludedMeshes = scene.meshes.filter((mesh) =>
        [
          'ceiling',
          'floor_1',
          'floor_2',
          'wall',
          'wainscot',
          'cornice',
          'pillar',
          'door',
        ].includes(mesh.name),
      );
      wallLight1.includedOnlyMeshes = wallLightIncludedMeshes;

      const wallLight2 = wallLight1.clone('wall_light_2') as PointLight;
      wallLight2.position = new Vector3(0, 2.2, 0.01);
      wallLight2.includedOnlyMeshes = wallLightIncludedMeshes;

      const wallLight3 = wallLight1.clone('wall_light_3') as PointLight;
      wallLight3.position = new Vector3(1.6, 2.2, -11);
      const wallLight3IncludedMeshes = scene.meshes.filter((mesh) =>
        ['stairs_base', 'stairs_back'].includes(mesh.name),
      );
      wallLight3.includedOnlyMeshes = wallLight3IncludedMeshes;

      const topLight = new DirectionalLight(
        'top_light',
        new Vector3(0.4, -1.0, -0.3),
        scene,
      );
      topLight.intensity = 0.15;
      topLight.diffuse = Color3.FromHexString('#ffdfc7');
      topLight.radius = 0.2;
      const topLightIncludedMeshes = scene.meshes.filter((mesh) =>
        [
          'wainscot',
          'pillar',
          'door',
          'railing_newel',
          'railing_handrail',
          'lamp_base',
        ].includes(mesh.name),
      );
      topLight.includedOnlyMeshes = topLightIncludedMeshes;
    };
  }

  public inputMove(value: number) {
    let newFrame = this.frame + value * this.moveSpeed;
    if (newFrame < 0) newFrame = 0;
    if (newFrame > this.maxFrame) newFrame = this.maxFrame;
    this.frame = newFrame;
  }
}
