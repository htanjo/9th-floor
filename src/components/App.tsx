import Screen from './Screen';
import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.app}>
      <div className={classes.container}>
        <Screen />
      </div>
    </div>
  );
}

export default App;
