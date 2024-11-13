import classes from './ProgressBar.module.scss';

interface ProgressBarProps {
  progress: number;
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className={classes.progressBar}>
      <span className={`${classes.icon} material-symbols-sharp`}>
        arrow_menu_close
      </span>
      <div className={classes.totalBar}>
        <div
          className={classes.activeBar}
          style={{
            translate: `${(1 - progress) * -100}%`,
          }}
        />
      </div>
      <span className={`${classes.icon} material-symbols-sharp`}>
        arrow_menu_open
      </span>
    </div>
  );
}

export default ProgressBar;
