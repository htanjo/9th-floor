import { useState } from 'react';
import { animated, config, useSpring } from '@react-spring/web';
import classes from './SplashScreen.module.scss';

interface SplashScreenProps {
  enabled: boolean;
  loadingProgress: number;
}

function SplashScreen({ enabled, loadingProgress }: SplashScreenProps) {
  const [unmounted, setUnmounted] = useState(false);

  const screenStyle = useSpring({
    opacity: enabled ? 1 : 0,
    config: config.molasses,
    delay: 400,
    onRest: (result) => {
      if (result.value.opacity === 0) {
        setUnmounted(true);
      }
    },
  });

  // Loading UI disappears faster.
  const loadingStyle = useSpring({
    opacity: enabled ? 1 : 0,
    config: config.default,
    delay: 200,
  });

  if (unmounted) {
    return null;
  }

  return (
    <animated.div className={classes.splashScreen} style={screenStyle}>
      <div className={classes.content}>
        <div className={classes.title}>
          <h1>
            The <span className={classes.emphasized}>9</span>th Fl
            <span className={classes.collapsed}>o</span>or
          </h1>
          <animated.div className={classes.loading} style={loadingStyle}>
            <div className={classes.progress}>
              <div
                className={classes.progressBar}
                style={{
                  transform: `translateX(${(1 - loadingProgress) * -100}%)`,
                }}
              />
            </div>
            <div className={classes.loadingText}>Loading...</div>
          </animated.div>
        </div>
      </div>
      <div className={classes.backdrop} />
    </animated.div>
  );
}

export default SplashScreen;
