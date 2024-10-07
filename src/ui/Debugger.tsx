import { useCallback, useState } from 'react';
import { FreeCamera, Scene, Vector3 } from '@babylonjs/core';
import '@babylonjs/inspector';
import { useAfterRender, useScene } from 'babylonjs-hook';
import classes from './Debugger.module.scss';

function Debugger() {
  const scene = useScene();
  const [fps, setFps] = useState('');
  const [freeCameraEnabled, setFreeCameraEnabled] = useState(false);

  const toggleInspector = useCallback(() => {
    if (scene?.debugLayer) {
      if (!scene.debugLayer.isVisible()) {
        scene.debugLayer.show({ embedMode: true, overlay: true });
      } else {
        scene.debugLayer.hide();
      }
    }
  }, [scene]);

  const toggleCamera = useCallback(() => {
    setFreeCameraEnabled((currentFreeCameraEnabled) => {
      // If scene is not ready, do nothing.
      if (!scene) {
        return currentFreeCameraEnabled;
      }
      // Initialize FreeCamera for the first time.
      if (!scene.getCameraByName('free_camera')) {
        const freeCamera = new FreeCamera(
          'free_camera',
          new Vector3(0, 5.1, 0),
          scene,
        );
        freeCamera.rotation.y = 180 * (Math.PI / 180);
        freeCamera.minZ = 0.01;
        freeCamera.fov = 57 * (Math.PI / 180);
        freeCamera.speed = 0.1;
        freeCamera.attachControl(scene.getEngine().getRenderingCanvas(), true);
        freeCamera.keysUp.push(87); // W
        freeCamera.keysDown.push(83); // S
        freeCamera.keysLeft.push(65); // A
        freeCamera.keysRight.push(68); // D
      }
      // Toggle active camera.
      if (currentFreeCameraEnabled) {
        const routeCamera = scene.getCameraByName('route_camera');
        scene.activeCamera = routeCamera;
      } else {
        const freeCamera = scene.getCameraByName('free_camera');
        scene.activeCamera = freeCamera;
      }
      return !currentFreeCameraEnabled;
    });
  }, [scene]);

  useAfterRender((currentScene: Scene) => {
    setFps(currentScene.getEngine().getFps().toFixed());
  });

  return (
    <div className={classes.debugger}>
      <button
        type="button"
        className={classes.button}
        onClick={toggleInspector}
      >
        Inspector
      </button>
      <button type="button" className={classes.button} onClick={toggleCamera}>
        Camera
      </button>
      <div className={classes.stats}>
        Free Camera: {freeCameraEnabled.toString()}
      </div>
      <div className={classes.stats}>FPS: {fps}</div>
    </div>
  );
}

export default Debugger;
