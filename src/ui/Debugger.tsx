import { ChangeEvent, MutableRefObject, useCallback, useState } from 'react';
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
  controllerRef: MutableRefObject<Controller | null>;
}

function Debugger({ controllerRef }: DebuggerProps) {
  const scene = useScene();
  const { i18n } = useTranslation();
  const [debuggerEnabled, setDebuggerEnabled] = useState(false);
  const [fps, setFps] = useState('');
  const [inspectorEnabled, setInspectorEnabled] = useState(false);
  const [freeCameraEnabled, setFreeCameraEnabled] = useState(false);
  const [, setRenderRequestStub] = useState(false);

  // Update state to force re-rendering.
  const updateControllerData = useCallback(
    () => setRenderRequestStub((stub) => !stub),
    [],
  );

  const toggleDebugger = useCallback(() => {
    setDebuggerEnabled((currentDebuggerEnabled) => !currentDebuggerEnabled);
  }, []);

  useAfterRender((currentScene: Scene) => {
    setFps(currentScene.getEngine().getFps().toFixed());
    if (controllerRef.current && debuggerEnabled) {
      updateControllerData();
    }
  });

  // If controller is not ready, hide debugger.
  if (!controllerRef.current) {
    return null;
  }

  // If debugger is not active, render minimum data.
  if (!debuggerEnabled) {
    return (
      <div className={classes.debugger}>
        <button
          type="button"
          className={classes.button}
          onClick={toggleDebugger}
        >
          <Icon name="toggle_off" className={classes.icon} />
          <span className={classes.label}>Debugger</span>
        </button>
        <div className={classes.stats}>
          <div className={classes.section}>FPS: {fps}</div>
        </div>
      </div>
    );
  }

  // Otherwise, if debugger is active, enable detailed features below.
  const {
    anomalyName,
    floorNumber,
    frame,
    moveForward,
    turnRate,
    areaName,
    routeOffset,
    routeInvert,
    roomEntered,
    anomalyCount,
    noAnomalyCount,
  } = controllerRef.current;

  const floorNumberOptions: number[] = (() => {
    const { minFloorNumber, maxFloorNumber } = controllerRef.current;
    const options = new Array(maxFloorNumber - (minFloorNumber - 1))
      .fill(0)
      .map((_item, index) => maxFloorNumber - index);
    return options;
  })();

  const languageDisplayName =
    supportedLanguages.find((language) => language.name === i18n.language)
      ?.displayName || '';

  const toggleInspector = async () => {
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
  };

  const toggleCamera = () => {
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
  };

  const handleChangeAnomaly = (event: ChangeEvent<HTMLSelectElement>) => {
    if (controllerRef.current) {
      const newAnomalyName = event.target.value || null;
      // eslint-disable-next-line no-param-reassign
      controllerRef.current.anomalyName = newAnomalyName;
      controllerRef.current.sceneManager.applyAnomaly(newAnomalyName);
    }
  };

  const handleChangeFloorNumber = (event: ChangeEvent<HTMLSelectElement>) => {
    if (controllerRef.current) {
      const newFloorNumber = parseInt(event.target.value, 10);
      // eslint-disable-next-line no-param-reassign
      controllerRef.current.floorNumber = newFloorNumber;
      controllerRef.current.sceneManager.applyFloor(newFloorNumber);
    }
  };

  const handleChangeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className={classes.debugger}>
      <button
        type="button"
        className={`${classes.button} ${classes.active}`}
        onClick={toggleDebugger}
      >
        <Icon name="toggle_on" className={classes.icon} />
        <span className={classes.label}>Debugger</span>
      </button>
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
        className={clsx(classes.button, freeCameraEnabled && classes.active)}
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
          <span className={classes.label}>{floorNumber}F</span>
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
      <div className={classes.stats}>
        <div className={classes.section}>
          [Movement]
          <br />
          Frame: {frame.toFixed(2)}
          <br />
          Move Forward: {moveForward.toString()}
          <br />
          Turn Rate: {turnRate.toFixed(2)}
        </div>
        <div className={classes.section}>
          [Area]
          <br />
          Floor: {floorNumber}
          <br />
          Area Name: {areaName}
          <br />
          Route Offset: {routeOffset}
          <br />
          Route Invert: {routeInvert.toString()}
        </div>
        <div className={classes.section}>
          [Anomaly]
          <br />
          Anomaly Name: {anomalyName || '(none)'}
          <br />
          Room Entered: {roomEntered.toString()}
          <br />
          Consecutive Anomaly Count: {anomalyCount}
          <br />
          Consecutive No Anomaly Count: {noAnomalyCount}
        </div>
        <div className={classes.section}>
          [Graphics]
          <br />
          Camera Mode: {freeCameraEnabled ? 'free' : 'default'}
          <br />
          FPS: {fps}
        </div>
      </div>
    </div>
  );
}

export default Debugger;
