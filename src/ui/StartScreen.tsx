import { useMemo } from 'react';
import classes from './StartScreen.module.scss';

interface StartScreenProps {
  enabled: boolean;
  progress: number;
}

function StartScreen({ enabled, progress }: StartScreenProps) {
  const contentTranslateY = useMemo(() => progress * -100, [progress]);
  const screenOpacity = useMemo(() => 1 - progress, [progress]);

  if (!enabled) {
    return null;
  }

  return (
    <div className={classes.startScreen} style={{ opacity: screenOpacity }}>
      <div
        className={classes.content}
        style={{
          transform: `translateY(${contentTranslateY}%)`,
        }}
      >
        <div className={classes.title}>
          <h1>
            The <span className={classes.emphasized}>9</span>th Fl
            <span className={classes.collapsed}>o</span>or
          </h1>
          <div className={classes.subtitle}>Technical Demo</div>
        </div>
        <div className={classes.navigation}>
          <span className={`${classes.icon} material-symbols-outlined`}>
            keyboard_double_arrow_down
          </span>{' '}
          Scroll to Play{' '}
          <span className={`${classes.icon} material-symbols-outlined`}>
            keyboard_double_arrow_down
          </span>
        </div>
      </div>
      <div className={classes.backdrop} />
    </div>
  );
}

export default StartScreen;
