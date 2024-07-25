import {
  AssetsManager,
  Color3,
  Color4,
  // FreeCamera,
  PBRMaterial,
  Scene,
  Vector3,
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import RouteCamera from './RouteCamera';
import { keyframes, Keyframes } from '../settings/keyframes';
import roomMesh from '../assets/room.glb?url';

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
    const { scene } = this;
    scene.clearColor = new Color4(0, 0, 0, 0);
    scene.ambientColor = Color3.White();
    scene.fogMode = Scene.FOGMODE_EXP2;
    scene.fogColor = Color3.FromHexString('#413d38');
    scene.fogDensity = 0.016;

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

    const assetsManager = new AssetsManager(scene);
    assetsManager.addMeshTask('roomMesh', undefined, roomMesh, '');
    assetsManager.load();

    assetsManager.onFinish = () => {
      scene.materials.forEach((material) => {
        const pbrMaterial = material as PBRMaterial;
        pbrMaterial.ambientColor = Color3.White();
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
