import React, { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import Menu from './Menu';
import Timer from './Timer';
import '../styles/App.css';
import '../styles/Styles.scss';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Menu');

  const goToTimer = () => setCurrentPage('Timer');

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  return (
    <div className="App">
      {
        currentPage === 'Timer' ?
          <Timer 
            time={''}
          />
        : <Menu 
            goToTimer={goToTimer} 
          />
      }
    </div>
  );
}

export default App;