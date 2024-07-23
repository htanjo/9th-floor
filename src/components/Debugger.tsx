import { useState } from 'react';
import { Scene } from '@babylonjs/core';
import '@babylonjs/inspector';
import { useAfterRender, useScene } from 'babylonjs-hook';
import classes from './Debugger.module.scss';

function Debugger() {
  const scene = useScene();
  const [fps, setFps] = useState('');
  const toggleInspector = () => {
    if (scene?.debugLayer) {
      if (!scene.debugLayer.isVisible()) {
        scene.debugLayer.show({ embedMode: true, overlay: true });
      } else {
        scene.debugLayer.hide();
      }
    }
  };
  useAfterRender((currentScene: Scene) => {
    setFps(currentScene.getEngine().getFps().toFixed());
  });

  return (
    <div className={classes.debugger}>
      <button
        type="button"
        className={classes.button}
        onClick={toggleInspector}
      >
        Inspector
      </button>
      <div className={classes.stats}>{fps} fps</div>
    </div>
  );
}

export default Debugger;
