import { useCallback, useRef } from 'react';
import { Scene } from '@babylonjs/core';
import SceneComponent from 'babylonjs-hook';
import Debugger from './Debugger';
import MainScene from '../babylon/MainScene';
import classes from './Screen.module.scss';

function Screen() {
  const mainSceneRef = useRef<MainScene | null>(null);

  const onSceneReady = useCallback(async (scene: Scene) => {
    const mainScene = new MainScene(scene);
    mainScene.start();
    mainSceneRef.current = mainScene;
  }, []);

  return (
    <SceneComponent
      // antialias
      // adaptToDeviceRatio
      onSceneReady={onSceneReady}
      // onRender={onRender}
      className={classes.screen}
    >
      <Debugger />
    </SceneComponent>
  );
}

export default Screen;
