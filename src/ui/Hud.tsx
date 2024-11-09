import { MouseEvent, useCallback } from 'react';
import { Tooltip } from 'react-tooltip';
import { hasPointingDevice } from '../settings/general';
import classes from './Hud.module.scss';

interface HudProps {
  fullscreen: boolean;
  onToggleFullscreen: (fullscreenEnable: boolean) => void;
}

function Hud({ fullscreen, onToggleFullscreen }: HudProps) {
  const toggleFullscreen = useCallback(
    (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      onToggleFullscreen(!fullscreen);
    },
    [onToggleFullscreen, fullscreen],
  );

  return (
    <div className={classes.hud}>
      <button
        type="button"
        className={classes.button}
        data-tooltip-id="hudTooltip"
        data-tooltip-content={fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        onClick={toggleFullscreen}
      >
        <span className={`${classes.icon} material-symbols-outlined`}>
          {fullscreen ? 'fullscreen_exit' : 'fullscreen'}
        </span>
      </button>
      {hasPointingDevice && (
        <Tooltip id="hudTooltip" className={classes.tooltip} />
      )}
    </div>
  );
}

export default Hud;
