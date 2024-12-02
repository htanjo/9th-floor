import { MouseEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-tooltip';
import Icon from './Icon';
import { hasPointingDevice, isIos } from '../settings/general';
import classes from './Hud.module.scss';

interface HudProps {
  fullscreen: boolean;
  onToggleFullscreen: (fullscreenEnable: boolean) => void;
}

function Hud({ fullscreen, onToggleFullscreen }: HudProps) {
  const { t } = useTranslation();
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
      {!isIos && ( // Hide fullscreen button from iOS as it conflicts scroll gestures.
        <>
          <button
            type="button"
            className={classes.button}
            data-tooltip-id="hudTooltip"
            data-tooltip-content={
              fullscreen ? t('Exit Fullscreen') : t('Fullscreen')
            }
            onClick={toggleFullscreen}
          >
            <Icon
              name={fullscreen ? 'fullscreen_exit' : 'fullscreen'}
              aria-label={fullscreen ? t('Exit Fullscreen') : t('Fullscreen')}
              className={classes.icon}
            />
          </button>
          {hasPointingDevice && (
            <Tooltip id="hudTooltip" className={classes.tooltip} />
          )}
        </>
      )}
    </div>
  );
}

export default Hud;
