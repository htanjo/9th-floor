import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { useAfterRender, useScene } from 'babylonjs-hook';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import Icon from './Icon';
import Controller from '../core/Controller';
import RouteCamera from '../graphics/RouteCamera';
import { anomalyConfigs } from '../settings/anomalies';
import { supportedLanguages } from '../i18n/init';
import classes from './Debugger.module.scss';

interface DebuggerProps {
  controller: Controller;
}

function Debugger({ controller }: DebuggerProps) {
  const scene = useScene();
  const { i18n } = useTranslation();
  const [debuggerEnabled, setDebuggerEnabled] = useState(false);
  const [fps, setFps] = useState('');
  const [inspectorEnabled, setInspectorEnabled] = useState(false);
  const [freeCameraEnabled, setFreeCameraEnabled] = useState(false);
  const [anomalyName, setAnomalyName] = useState<string | null>(null);
  const [floorNumber, setFloorNumber] = useState(controller.floorNumber);
  const floorNumberOptions: number[] = useMemo(() => {
    const options = new Array(
      controller.maxFloorNumber - (controller.minFloorNumber - 1),
    )
      .fill(0)
      .map((_item, index) => controller.maxFloorNumber - index);
    return options;
  }, [controller.minFloorNumber, controller.maxFloorNumber]);
  const languageDisplayName = useMemo(
    () =>
      supportedLanguages.find((language) => language.name === i18n.language)
        ?.displayName || '',
    [i18n.language],
  );

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

  const handleChangeAnomaly = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const newAnomalyName = event.target.value || null;
      setAnomalyName(newAnomalyName);
      // eslint-disable-next-line no-param-reassign
      controller.anomalyName = newAnomalyName;
      controller.sceneManager.applyAnomaly(newAnomalyName);
    },
    [controller],
  );

  const handleChangeFloorNumber = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const newFloorNumber = parseInt(event.target.value, 10);
      setFloorNumber(newFloorNumber);
      // eslint-disable-next-line no-param-reassign
      controller.floorNumber = newFloorNumber;
      controller.sceneManager.applyFloor(newFloorNumber);
    },
    [controller],
  );

  const handleChangeLanguage = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      i18n.changeLanguage(event.target.value);
    },
    [i18n],
  );

  useEffect(() => {
    setAnomalyName(controller.anomalyName);
    setFloorNumber(controller.floorNumber);
  }, [controller]);

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
        <Icon
          name={debuggerEnabled ? 'toggle_on' : 'toggle_off'}
          className={classes.icon}
        />
        <span className={classes.label}>Debugger</span>
      </button>
      {debuggerEnabled ? (
        <>
          <button
            type="button"
            className={clsx(classes.button, inspectorEnabled && classes.active)}
            onClick={toggleInspector}
          >
            <Icon
              name="frame_inspect"
              className={classes.icon}
              aria-label="Toggle Inspector"
            />
          </button>
          <button
            type="button"
            className={clsx(
              classes.button,
              freeCameraEnabled && classes.active,
            )}
            onClick={toggleCamera}
          >
            <Icon
              name="videocam"
              className={classes.icon}
              aria-label="Toggle Camera"
            />
          </button>
          <div className={`${classes.dropdown} ${classes.dropdownLarge}`}>
            <button type="button" className={`${classes.button}`}>
              <Icon name="brightness_alert" className={classes.icon} />
              <span className={classes.label}>{anomalyName || '(none)'}</span>
              <Icon
                name="arrow_drop_down"
                className={`${classes.icon} ${classes.arrow}`}
              />
            </button>
            <select
              className={classes.select}
              value={anomalyName || ''}
              onChange={handleChangeAnomaly}
            >
              <option value="">(none)</option>
              {anomalyConfigs.map((anomaly) => (
                <option key={anomaly.name} value={anomaly.name}>
                  {anomaly.name}
                </option>
              ))}
            </select>
          </div>
          <div className={`${classes.dropdown} ${classes.dropdownSmall}`}>
            <button type="button" className={`${classes.button}`}>
              <Icon name="floor" className={classes.icon} />
              <span className={classes.label}>{controller.floorNumber}F</span>
              <Icon
                name="arrow_drop_down"
                className={`${classes.icon} ${classes.arrow}`}
              />
            </button>
            <select
              className={classes.select}
              value={floorNumber}
              onChange={handleChangeFloorNumber}
            >
              {floorNumberOptions.map((number) => (
                <option key={number} value={number}>
                  {number}F
                </option>
              ))}
            </select>
          </div>
          <div className={`${classes.dropdown} ${classes.dropdownMedium}`}>
            <button type="button" className={`${classes.button}`}>
              <Icon name="language" className={classes.icon} />
              <span className={classes.label}>{languageDisplayName}</span>
              <Icon
                name="arrow_drop_down"
                className={`${classes.icon} ${classes.arrow}`}
              />
            </button>
            <select
              className={classes.select}
              value={i18n.language}
              onChange={handleChangeLanguage}
            >
              {supportedLanguages.map((language) => (
                <option key={language.name} value={language.name}>
                  {language.displayName}
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
              Frame: {controller.frame.toFixed(2)}
              <br />
              Move Forward: {controller.moveForward.toString()}
              <br />
              Turn Rate: {controller.turnRate.toFixed(2)}
            </div>
            <div className={classes.section}>
              [Area]
              <br />
              Floor: {controller.floorNumber}
              <br />
              Area Name: {controller.areaName}
              <br />
              Route Offset: {controller.routeOffset}
              <br />
              Route Invert: {controller.routeInvert.toString()}
            </div>
            <div className={classes.section}>
              [Anomaly]
              <br />
              Anomaly Name: {controller.anomalyName || '(none)'}
              <br />
              Room Entered: {controller.roomEntered.toString()}
              <br />
              Consecutive Anomaly Count: {controller.anomalyCount}
              <br />
              Consecutive No Anomaly Count: {controller.noAnomalyCount}
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
