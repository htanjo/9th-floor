import { useCallback, useEffect, useRef } from 'react';
import { Scene } from '@babylonjs/core';
import SceneComponent from 'babylonjs-hook';
import VirtualScroll, { VirtualScrollEvent } from 'virtual-scroll';
import SceneManager from '../graphics/SceneManager';
import Debugger from '../ui/Debugger';
import classes from './Screen.module.scss';

function Screen() {
  const sceneManagerRef = useRef<SceneManager | null>(null);

  const handleScroll = useCallback((event: VirtualScrollEvent) => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.inputMove(-event.deltaY); // Negative deltaY means scroll to bottom.
    }
  }, []);

  const onSceneReady = useCallback(async (scene: Scene) => {
    const sceneManager = new SceneManager(scene);
    sceneManager.start();
    sceneManagerRef.current = sceneManager;
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
