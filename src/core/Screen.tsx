import { useCallback, useState } from 'react';
import { Scene } from '@babylonjs/core';
import SceneComponent from 'babylonjs-hook';
import Controller from './Controller';
import StartScreen from '../ui/StartScreen';
import Debugger from '../ui/Debugger';
import classes from './Screen.module.scss';
import LoadingScreen from '../ui/LoadingScreen';

function Screen() {
  const [controllerInstance, setControllerInstance] =
    useState<Controller | null>(null);
  const [LoadingScreenEnabled, setLoadingScreenEnabled] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [startScreenEnabled, setStartScreenEnabled] = useState(false);
  const [startScreenProgress, setStartScreenProgress] = useState(0);
  const [startScreenScroll, setStartScreenScroll] = useState(0);

  const onSceneReady = useCallback(async (scene: Scene) => {
    const controller = new Controller(scene);
    controller.onLoadingScreenToggle((enabled) =>
      setLoadingScreenEnabled(enabled),
    );
    controller.onLoadingProgress((progress) => setLoadingProgress(progress));
    controller.onStartScreenToggle((enabled) => setStartScreenEnabled(enabled));
    controller.onStartScreenProgress((progress, scroll) => {
      setStartScreenProgress(progress);
      setStartScreenScroll(scroll);
    });
    setControllerInstance(controller);
  }, []);

  return (
    <>
      <LoadingScreen
        enabled={LoadingScreenEnabled}
        loadingProgress={loadingProgress}
      />
      <StartScreen
        enabled={startScreenEnabled}
        progress={startScreenProgress}
        scroll={startScreenScroll}
      />
      <SceneComponent
        // antialias
        // adaptToDeviceRatio
        onSceneReady={onSceneReady}
        // onRender={onRender}
        className={classes.screen}
      >
        <Debugger controller={controllerInstance} />
      </SceneComponent>
    </>
  );
}

export default Screen;
