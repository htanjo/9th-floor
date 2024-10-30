import { useEffect, useState } from 'react';
import { animated, config, easings, useSpring } from '@react-spring/web';
import Logo from './Logo';
import { hasTouchscreen } from '../settings/general';
import classes from './StartScreen.module.scss';

interface StartScreenProps {
  enabled: boolean;
  progress: number;
}

function StartScreen({ enabled, progress }: StartScreenProps) {
  const [mounted, setMounted] = useState(enabled);

  const contentStyle = useSpring({
    opacity: 1 - progress,
    transform: `translateY(${progress * -100}%)`,
    config: {
      easing: easings.easeOutSine,
      duration: hasTouchscreen ? 100 : 200,
    },
    onRest: (result) => {
      if (result.value.opacity === 0) {
        setMounted(false);
      }
    },
  });

  const navigationStyle = useSpring({
    opacity: enabled ? 1 : 0,
    transform: enabled ? 'translateY(0)' : `translateY(1em)`,
    config: config.default,
    delay: 1200,
  });

  const backdropStyle = useSpring({
    opacity: 1 - progress,
    config: config.default,
  });

  const letterboxTopStyle = useSpring({
    transform: `translateY(${-80 - progress * 20}%)`,
    config: config.default,
  });

  const letterboxBottomStyle = useSpring({
    transform: `translateY(${80 + progress * 20}%)`,
    config: config.default,
  });

  useEffect(() => {
    if (enabled) {
      setMounted(true);
    }
  }, [enabled]);

  if (!mounted) {
    return null;
  }

  return (
    <div className={classes.startScreen}>
      <animated.div className={classes.content} style={contentStyle}>
        <div className={classes.title}>
          <h1>
            <Logo />
          </h1>
          <div className={classes.subtitle}>Technical Demo</div>
        </div>
        <animated.div className={classes.navigation} style={navigationStyle}>
          <span className={`${classes.icon} material-symbols-outlined`}>
            keyboard_double_arrow_down
          </span>{' '}
          Scroll to Play{' '}
          <span className={`${classes.icon} material-symbols-outlined`}>
            keyboard_double_arrow_down
          </span>
        </animated.div>
      </animated.div>
      <animated.div className={classes.backdrop} style={backdropStyle} />
      <animated.div
        className={classes.letterboxTop}
        style={letterboxTopStyle}
      />
      <animated.div
        className={classes.letterboxBottom}
        style={letterboxBottomStyle}
      />
    </div>
  );
}

export default StartScreen;
