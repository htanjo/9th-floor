import { useCallback, useState } from 'react';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { useAfterRender, useScene } from 'babylonjs-hook';
import Controller from '../core/Controller';
import RouteCamera from '../graphics/RouteCamera';
import classes from './Debugger.module.scss';

interface DebuggerProps {
  controller: Controller | null;
}

function Debugger({ controller }: DebuggerProps) {
  const scene = useScene();
  const [debuggerEnabled, setDebuggerEnabled] = useState(false);
  const [fps, setFps] = useState('');
  const [freeCameraEnabled, setFreeCameraEnabled] = useState(false);
  // const [effectsEnabled, setEffectsEnabled] = useState(true);

  const toggleDebugger = useCallback(() => {
    setDebuggerEnabled((currentDebuggerEnabled) => !currentDebuggerEnabled);
  }, []);

  const toggleInspector = useCallback(async () => {
    await import('@babylonjs/inspector');
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
        freeCamera.maxZ = 100;
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
      <button type="button" className={classes.button} onClick={toggleDebugger}>
        Debugger
      </button>
      {debuggerEnabled ? (
        <>
          <button
            type="button"
            className={classes.button}
            onClick={toggleInspector}
          >
            Inspector
          </button>
          <button
            type="button"
            className={classes.button}
            onClick={toggleCamera}
          >
            Camera
          </button>
          {/* <button type="button" className={classes.button} onClick={toggleEffects}>
        Effects
      </button> */}
          <div className={classes.stats}>
            <div className={classes.section}>
              [Movement]
              <br />
              Frame: {controller ? controller.frame.toFixed(2) : '--'}
              <br />
              Move Forward:{' '}
              {controller ? controller.moveForward.toString() : '--'}
              <br />
              Turn Rate: {controller ? controller.turnRate.toFixed(2) : '--'}
            </div>
            <div className={classes.section}>
              [Area]
              <br />
              Floor: {controller ? controller.floorNumber : '--'}
              <br />
              Area Name: {controller ? controller.areaName : '--'}
              <br />
              Route Offset: {controller ? controller.routeOffset : '--'}
              <br />
              Route Invert:{' '}
              {controller ? controller.routeInvert.toString() : '--'}
            </div>
            <div className={classes.section}>
              [Anomaly]
              <br />
              Anomaly Name:{' '}
              {controller ? controller.anomalyName || '(none)' : '--'}
              <br />
              Room Entered:{' '}
              {controller ? controller.roomEntered.toString() : '--'}
              <br />
              Consecutive Anomaly Count:{' '}
              {controller ? controller.anomalyCount : '--'}
              <br />
              Consecutive No Anomaly Count:{' '}
              {controller ? controller.noAnomalyCount : '--'}
            </div>
            <div className={classes.section}>
              [Graphics]
              <br />
              Camera Mode: {freeCameraEnabled ? 'free' : 'default'}
              <br />
              {/* Effects: {effectsEnabled.toString()} */}
              FPS: {fps}
            </div>
          </div>
        </>
      ) : (
        <div className={classes.stats}>FPS: {fps}</div>
      )}
    </div>
  );
}

export default Debugger;
