import React, { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import Menu from './Menu';
import Timer from './Timer';
import '../styles/App.css';
import '../styles/Styles.scss';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Menu');

  const goToTimer = () => setCurrentPage('Timer');

  const time = new Date();
  let pomodoroLength = 25, breakLength = 5, longBreakLength = 15;

  time.setSeconds(time.getSeconds() + pomodoroLength * 60)

  let expiryTimestamp = time;

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  const restartTimer = () => {
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + pomodoroLength * 60) 
    restart(newTime);
    pause();
  }

  useEffect(() => {
    restartTimer();
  }, [])

  return (
    <div className="App">
      {
        currentPage === 'Timer' ?
          <Timer 
            time={`${minutes}: ${seconds}`}
            isRunning={isRunning}
            start={start}
            pause={pause}
            resume={resume}
            restart={restartTimer}
          />
        : <Menu 
            goToTimer={goToTimer} 
          />
      }
    </div>
  );
}

export default App;