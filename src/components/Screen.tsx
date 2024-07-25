import { useCallback, useEffect, useRef } from 'react';
import { Scene } from '@babylonjs/core';
import SceneComponent from 'babylonjs-hook';
import VirtualScroll, { VirtualScrollEvent } from 'virtual-scroll';
import Debugger from './Debugger';
import MainScene from '../babylon/MainScene';
import classes from './Screen.module.scss';

function Screen() {
  const mainSceneRef = useRef<MainScene | null>(null);

  const handleScroll = useCallback((event: VirtualScrollEvent) => {
    if (mainSceneRef.current) {
      mainSceneRef.current.inputMove(-event.deltaY); // Negative deltaY means scroll to bottom.
    }
  }, []);

  const onSceneReady = useCallback(async (scene: Scene) => {
    const mainScene = new MainScene(scene);
    mainScene.start();
    mainSceneRef.current = mainScene;
  }, []);

  useEffect(() => {
    const virtualScroll = new VirtualScroll({ touchMultiplier: 3 });
    virtualScroll.on(handleScroll);
    return () => virtualScroll.destroy();
  }, [handleScroll]);

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
