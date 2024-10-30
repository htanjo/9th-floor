import clsx from 'clsx';
import classes from './Logo.module.scss';

interface LogoProps {
  colorized?: boolean;
}

function Logo({ colorized = true }: LogoProps) {
  return (
    <span className={clsx(classes.logo, colorized && classes.colorized)}>
      The <span className={classes.emphasized}>9</span>
      th Fl
      <span className={classes.collapsed}>o</span>or
    </span>
  );
}

export default Logo;
