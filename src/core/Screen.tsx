import { useCallback, useState } from 'react';
import { Scene } from '@babylonjs/core';
import SceneComponent from 'babylonjs-hook';
import Controller from './Controller';
import StartScreen from '../ui/StartScreen';
import Debugger from '../ui/Debugger';
import classes from './Screen.module.scss';
import SplashScreen from '../ui/SplashScreen';

function Screen() {
  const [splashScreenEnabled, setSplashScreenEnabled] = useState(true);
  const [startScreenEnabled, setStartScreenEnabled] = useState(false);
  const [startScreenProgress, setStartScreenProgress] = useState(0);

  const onSceneReady = useCallback(async (scene: Scene) => {
    const controller = new Controller(scene);
    controller.onSplashScreenToggle((enabled) =>
      setSplashScreenEnabled(enabled),
    );
    controller.onStartScreenToggle((enabled) => setStartScreenEnabled(enabled));
    controller.onStartScreenProgress((progress) =>
      setStartScreenProgress(progress),
    );
  }, []);

  return (
    <>
      <SplashScreen enabled={splashScreenEnabled} />
      <StartScreen
        enabled={startScreenEnabled}
        progress={startScreenProgress}
      />
      <SceneComponent
        // antialias
        // adaptToDeviceRatio
        onSceneReady={onSceneReady}
        // onRender={onRender}
        className={classes.screen}
      >
        <Debugger />
      </SceneComponent>
    </>
  );
}

export default Screen;
