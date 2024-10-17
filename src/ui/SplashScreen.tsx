import { useState } from 'react';
import { animated, config, useSpring } from '@react-spring/web';
import { ThreeDots } from 'react-loader-spinner';
import classes from './SplashScreen.module.scss';

interface SplashScreenProps {
  enabled: boolean;
}

function SplashScreen({ enabled }: SplashScreenProps) {
  const [unmounted, setUnmounted] = useState(false);

  const style = useSpring({
    opacity: enabled ? 1 : 0,
    config: config.molasses,
    onRest: (result) => {
      if (result.value.opacity === 0) {
        setUnmounted(true);
      }
    },
  });

  if (unmounted) {
    return null;
  }

  return (
    <animated.div className={classes.splashScreen} style={style}>
      <div className={classes.content}>
        <div className={classes.title}>
          <h1>
            The <span className={classes.emphasized}>9</span>th Fl
            <span className={classes.collapsed}>o</span>or
          </h1>
          <div className={classes.loading}>
            <div className={classes.spinner}>
              <ThreeDots width={36} height={36} radius={4} color="#b7a696" />
            </div>
            <div className={classes.loadingText}>Loading</div>
            <div className={classes.spinner}>
              <ThreeDots width={36} height={36} radius={4} color="#b7a696" />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.backdrop} />
    </animated.div>
  );
}

export default SplashScreen;
