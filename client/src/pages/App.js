import React, { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import Menu from './Menu';
import Timer from './Timer';
import '../styles/App.css';
import '../styles/Styles.scss';

const App = () => {
  // page handler
  const [currentPage, setCurrentPage] = useState('Menu');
  const goToTimer = () => setCurrentPage('Timer');

  // state management
  const [pomodoroLength, setPomodoroLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [longBreakLength, setlongBreakLength] = useState(15);
  const [currentState, setCurrentState] = useState('pomodoro');
  const setPomodoro = () => {setCurrentState('pomodoro');};
  const setBreak = () => {setCurrentState('break');};
  const setLongBreak = () => {setCurrentState('long break');};

  // time management
  let expiryTimestamp = 0;
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
  } = useTimer({ expiryTimestamp, onExpire: () => {console.log('expire')} });

  const restartTimer = () => {
    let minutes;
    switch(currentState) {
      case 'pomodoro':
        minutes = pomodoroLength;
        break;
      case 'break':
        minutes = breakLength;
        break;
      case 'long break':
        minutes = longBreakLength;
        break;
      default:
        minutes = 0;
        break;
    }

    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + minutes * 60);
    restart(newTime, false);
  }

  useEffect(() => {
    restartTimer();
  }, [])

  return (
    <div className="App">
      {
        currentPage === 'Timer' ?
          <Timer 
            time={`${minutes}:${seconds}`}
            isRunning={isRunning}
            start={start}
            pause={pause}
            resume={resume}
            restart={restartTimer}
            setPomodoro={() => {setPomodoro(); restartTimer('pomodoro');}}
            setBreak={() => {setBreak(); restartTimer('break');}}
            setLongBreak={() => {setLongBreak(); restartTimer('long break');}}
          />
        : <Menu 
            goToTimer={goToTimer} 
          />
      }
    </div>
  );
}

export default App;