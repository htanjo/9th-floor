import { useCallback, useState } from 'react';
import { Scene } from '@babylonjs/core';
import SceneComponent from 'babylonjs-hook';
import Controller from './Controller';
import StartScreen from '../ui/StartScreen';
import Debugger from '../ui/Debugger';
import classes from './Screen.module.scss';

function Screen() {
  const [startScreenEnabled, setStartScreenEnabled] = useState(true);
  const [startScreenProgress, setStartScreenProgress] = useState(0);

  const onSceneReady = useCallback(async (scene: Scene) => {
    const controller = new Controller(scene);
    controller.onStartScreenToggle((enabled) => setStartScreenEnabled(enabled));
    controller.onStartScreenProgress((progress) =>
      setStartScreenProgress(progress),
    );
  }, []);

  return (
    <>
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
