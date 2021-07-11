import React, { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import Menu from './Menu';
import Timer from './Timer';
import '../styles/App.css';
import '../styles/Styles.scss';

import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp({
  apiKey: "AIzaSyCt9tsbFxMESJRMqaLVE4sBl6BMf7LYqZI",
  authDomain: "focused-time.firebaseapp.com",
  projectId: "focused-time",
  storageBucket: "focused-time.appspot.com",
  messagingSenderId: "859103137091",
  appId: "1:859103137091:web:b3bd1dc45c455997dff3f6"
});

const auth = firebase.auth();

const App = () => {
  // page handler
  const [currentPage, setCurrentPage] = useState('Menu');
  const goToMenu = () => setCurrentPage('Menu');
  const goToTimer = () => setCurrentPage('Timer');
  const goToProfile = () => setCurrentPage('Profile');

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

  const restartTimer = (state = '') => {
    let minutes;
    switch(state) {
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
        minutes = currentState;
        break;
    }

    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + minutes * 60);
    restart(newTime, false);
  }

  useEffect(() => {
    restartTimer('pomodoro');
  }, [])

  return (
    <div className='App' >
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
            goToMenu={goToMenu}
            goToTimer={goToTimer}
            goToProfile={goToProfile}
          />
        : currentPage === 'Profile' ?
          <Profile />
        : <Menu 
            goToTimer={goToTimer} 
          />
      }
    </div>
  );
}

export default App;