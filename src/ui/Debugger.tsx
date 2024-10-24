import { useCallback, useState } from 'react';
import { FreeCamera, Scene, Vector3 } from '@babylonjs/core';
import '@babylonjs/inspector';
import { useAfterRender, useScene } from 'babylonjs-hook';
import RouteCamera from '../graphics/RouteCamera';
import classes from './Debugger.module.scss';

function Debugger() {
  const scene = useScene();
  const [fps, setFps] = useState('');
  const [freeCameraEnabled, setFreeCameraEnabled] = useState(false);
  // const [effectsEnabled, setEffectsEnabled] = useState(true);

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
      const routeCamera = scene.getCameraByName('route_camera') as RouteCamera;
      let freeCamera = scene.getCameraByName('free_camera') as FreeCamera;
      // Initialize FreeCamera for the first time.
      if (!freeCamera) {
        freeCamera = new FreeCamera('free_camera', Vector3.Zero(), scene);
        freeCamera.rotation.y = 180 * (Math.PI / 180);
        freeCamera.minZ = 0.01;
        freeCamera.speed = 0.1;
        freeCamera.attachControl(scene.getEngine().getRenderingCanvas(), true);
        freeCamera.keysUp.push(87); // W
        freeCamera.keysDown.push(83); // S
        freeCamera.keysLeft.push(65); // A
        freeCamera.keysRight.push(68); // D
      }
      // Toggle active camera.
      if (currentFreeCameraEnabled) {
        scene.activeCamera = routeCamera;
      } else {
        freeCamera.position = routeCamera.position.clone();
        freeCamera.rotation = routeCamera.rotation.clone();
        freeCamera.fov = routeCamera.fov;
        scene.activeCamera = freeCamera;
      }
      return !currentFreeCameraEnabled;
    });
  }, [scene]);

  // TODO: Screen is too dark when disabling the effects.
  // const toggleEffects = useCallback(() => {
  //   setEffectsEnabled((currentEffectsEnabled) => {
  //     // If scene is not ready, do nothing.
  //     if (!scene) {
  //       return currentEffectsEnabled;
  //     }
  //     if (currentEffectsEnabled) {
  //       scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline(
  //         'effects',
  //         scene.cameras,
  //       );
  //     } else {
  //       scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline(
  //         'effects',
  //         scene.cameras,
  //       );
  //     }
  //     return !currentEffectsEnabled;
  //   });
  // }, [scene]);

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
      {/* <button type="button" className={classes.button} onClick={toggleEffects}>
        Effects
      </button> */}
      <div className={classes.stats}>
        Free Camera: {freeCameraEnabled.toString()}
      </div>
      {/* <div className={classes.stats}>Effects: {effectsEnabled.toString()}</div> */}
      <div className={classes.stats}>FPS: {fps}</div>
    </div>
  );
}

export default Debugger;
