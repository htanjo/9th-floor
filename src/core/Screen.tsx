import { useCallback, useEffect, useState } from 'react';
import { Scene } from '@babylonjs/core/scene';
import SceneComponent from 'babylonjs-hook';
import Controller from './Controller';
import StartScreen from '../ui/StartScreen';
import Debugger from '../ui/Debugger';
import classes from './Screen.module.scss';
import LoadingScreen from '../ui/LoadingScreen';
import Hud from '../ui/Hud';

function Screen() {
  const [controllerInstance, setControllerInstance] =
    useState<Controller | null>(null);
  const [LoadingScreenEnabled, setLoadingScreenEnabled] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [startScreenEnabled, setStartScreenEnabled] = useState(false);
  const [startScreenProgress, setStartScreenProgress] = useState(0);
  const [startScreenScroll, setStartScreenScroll] = useState(0);
  const [fullscreen, setFullscreen] = useState(!!document.fullscreenElement);

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

  const toggleFullscreen = useCallback((fullScreenEnable: boolean) => {
    if (fullScreenEnable) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const changeFullscreenState = useCallback(() => {
    if (document.fullscreenElement) {
      setFullscreen(true);
    } else {
      setFullscreen(false);
    }
  }, []);

  // F11 doesn't trigger "fullscreenchange" event when entering fullscreen.
  // As a workaround, override entering fullscreen with JavaScript API.
  // Reference: https://stackoverflow.com/a/21118401
  const enterFullscreenWithKeyboard = useCallback(
    (event: globalThis.KeyboardEvent) => {
      if (event.key === 'F11' && !document.fullscreenElement) {
        event.preventDefault();
        document.documentElement.requestFullscreen();
      }
    },
    [],
  );

  useEffect(() => {
    document.addEventListener('fullscreenchange', changeFullscreenState);
    document.addEventListener('keydown', enterFullscreenWithKeyboard);
    return () => {
      document.removeEventListener('fullscreenchange', changeFullscreenState);
      document.removeEventListener('keydown', enterFullscreenWithKeyboard);
    };
  });

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
        <Hud fullscreen={fullscreen} onToggleFullscreen={toggleFullscreen} />
        <Debugger controller={controllerInstance} />
      </SceneComponent>
    </>
  );
}

export default Screen;
