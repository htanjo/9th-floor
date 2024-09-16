import { useCallback } from 'react';
import { Scene } from '@babylonjs/core';
import SceneComponent from 'babylonjs-hook';
import Controller from './Controller';
import Debugger from '../ui/Debugger';
import classes from './Screen.module.scss';

function Screen() {
  const onSceneReady = useCallback(async (scene: Scene) => {
    // eslint-disable-next-line no-new
    new Controller(scene);
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
