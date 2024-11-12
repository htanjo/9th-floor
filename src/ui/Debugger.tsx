import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { useAfterRender, useScene } from 'babylonjs-hook';
import clsx from 'clsx';
import Controller from '../core/Controller';
import RouteCamera from '../graphics/RouteCamera';
import classes from './Debugger.module.scss';
import { anomalyConfigs } from '../settings/anomalies';

interface DebuggerProps {
  controller: Controller | null;
}

function Debugger({ controller }: DebuggerProps) {
  const scene = useScene();
  const [debuggerEnabled, setDebuggerEnabled] = useState(false);
  const [fps, setFps] = useState('');
  const [inspectorEnabled, setInspectorEnabled] = useState(false);
  const [freeCameraEnabled, setFreeCameraEnabled] = useState(false);
  const [anomalyName, setAnomalyName] = useState<string | null>(null);
  // const [effectsEnabled, setEffectsEnabled] = useState(true);

  const toggleDebugger = useCallback(() => {
    setDebuggerEnabled((currentDebuggerEnabled) => !currentDebuggerEnabled);
  }, []);

  const toggleInspector = useCallback(async () => {
    await import('@babylonjs/inspector');
    if (scene?.debugLayer) {
      setInspectorEnabled((currentInspectorEnabled) => {
        if (!currentInspectorEnabled) {
          scene.debugLayer.show({ embedMode: true, overlay: true });
          return true;
        }
        scene.debugLayer.hide();
        return false;
      });
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

  const changeAnomaly = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      if (controller) {
        const newAnomalyName = event.target.value || null;
        setAnomalyName(newAnomalyName);
        // eslint-disable-next-line no-param-reassign
        controller.anomalyName = newAnomalyName;
        controller.sceneManager.applyAnomaly(newAnomalyName);
      }
    },
    [controller],
  );

  useEffect(() => {
    if (controller?.anomalyName) {
      setAnomalyName(controller.anomalyName);
    } else {
      setAnomalyName(null);
    }
  }, [controller?.anomalyName]);

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
        className={clsx(classes.button, debuggerEnabled && classes.active)}
        onClick={toggleDebugger}
      >
        <span className={`${classes.icon} material-symbols-outlined`}>
          {debuggerEnabled ? 'toggle_on' : 'toggle_off'}
        </span>
        <span className={classes.label}>Debugger</span>
      </button>
      {debuggerEnabled ? (
        <>
          <button
            type="button"
            className={clsx(classes.button, inspectorEnabled && classes.active)}
            onClick={toggleInspector}
          >
            <span className={`${classes.icon} material-symbols-outlined`}>
              frame_inspect
            </span>
          </button>
          <button
            type="button"
            className={clsx(
              classes.button,
              freeCameraEnabled && classes.active,
            )}
            onClick={toggleCamera}
          >
            <span className={`${classes.icon} material-symbols-outlined`}>
              videocam
            </span>
          </button>
          <div className={classes.dropdown}>
            <button type="button" className={`${classes.button}`}>
              <span className={`${classes.icon} material-symbols-outlined`}>
                emergency_home
              </span>
              <span className={classes.label}>
                {anomalyName || '(no_anomaly)'}
              </span>
              <span
                className={`${classes.icon} ${classes.arrow} material-symbols-outlined`}
              >
                arrow_drop_down
              </span>
            </button>
            <select
              className={classes.select}
              value={anomalyName || ''}
              onChange={changeAnomaly}
            >
              <option value="">(no_anomaly)</option>
              {anomalyConfigs.map((anomaly) => (
                <option key={anomaly.name} value={anomaly.name}>
                  {anomaly.name}
                </option>
              ))}
            </select>
          </div>
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
        <div className={classes.stats}>
          <div className={classes.section}>FPS: {fps}</div>
        </div>
      )}
    </div>
  );
}

export default Debugger;
