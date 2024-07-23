import {
  AssetsManager,
  Color3,
  Color4,
  FreeCamera,
  PBRMaterial,
  Scene,
  Vector3,
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import roomMesh from '../assets/room.glb?url';

export default class MainScene {
  public scene: Scene;

  public constructor(scene: Scene) {
    this.scene = scene;
  }

  public async start() {
    const { scene } = this;
    scene.clearColor = new Color4(0, 0, 0, 0);
    scene.ambientColor = Color3.White();
    scene.fogMode = Scene.FOGMODE_EXP2;
    scene.fogColor = Color3.FromHexString('#413d38');
    scene.fogDensity = 0.016;

    // scene.getEngine().setHardwareScalingLevel(1 / window.devicePixelRatio);

    const freeCamera = new FreeCamera(
      'freeCamera',
      new Vector3(0, 1.5, 0),
      scene,
    );
    freeCamera.rotation.y = 180 * (Math.PI / 180);
    freeCamera.minZ = 0.01;
    freeCamera.fov = 57 * (Math.PI / 180);
    freeCamera.speed = 0.1;
    scene.activeCamera = freeCamera;
    freeCamera.attachControl(scene.getEngine().getRenderingCanvas(), true);

    const assetsManager = new AssetsManager(scene);
    assetsManager.addMeshTask('roomMesh', undefined, roomMesh, '');
    assetsManager.load();

    assetsManager.onFinish = () => {
      scene.materials.forEach((material) => {
        const pbrMaterial = material as PBRMaterial;
        pbrMaterial.ambientColor = Color3.White();
      });
    };

    scene.registerBeforeRender(() => {
      const canvas = scene.getEngine().getRenderingCanvas();
      if (canvas) {
        let fov: number;
        const aspectRatio = canvas.width / canvas.height;
        const minAspectRatio = 9 / 16;
        const maxAspectRatio = 16 / 9;
        const minFov = 55 * (Math.PI / 180);
        const maxFov = 81 * (Math.PI / 180);
        if (aspectRatio < minAspectRatio) {
          fov = maxFov;
        } else if (aspectRatio > maxAspectRatio) {
          fov = minFov;
        } else {
          const fovExtensionRatio =
            (maxAspectRatio - aspectRatio) / (maxAspectRatio - minAspectRatio);
          fov = minFov + (maxFov - minFov) * fovExtensionRatio;
        }
        freeCamera.fov = fov;
      }
    });
  }
}
