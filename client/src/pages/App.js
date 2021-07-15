import React, { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import Menu from './Menu';
import Timer from './Timer';
import Profile from './Profile';
import { ReactComponent as GoogleIcon } from '../images/google.svg';
import '../styles/Styles.scss';

import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCt9tsbFxMESJRMqaLVE4sBl6BMf7LYqZI",
    authDomain: "focused-time.firebaseapp.com",
    projectId: "focused-time",
    storageBucket: "focused-time.appspot.com",
    messagingSenderId: "859103137091",
    appId: "1:859103137091:web:b3bd1dc45c455997dff3f6"
  });
} else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();

const localStorage = window.localStorage;
const defaultConfig = {
  pomodoroLength: 25,
  breakLength: 5,
  longBreakLength: 15,
  autoStart: false,
  longBreakInterval: 3,
  volume: 50,
  alarm: 'Kitchen Alarm'
};

const App = () => {
  // page handler
  const [currentPage, setCurrentPage] = useState('Menu');
  const goToMenu = () => setCurrentPage('Menu');
  const goToTimer = () => setCurrentPage('Timer');
  const goToProfile = () => setCurrentPage('Profile');

  // state management
  const previousForm = (localStorage.hasOwnProperty('config')) ? JSON.parse(localStorage.config): defaultConfig;
  const [pomodoroLength, setPomodoroLength] = useState(previousForm.pomodoroLength);
  const [breakLength, setBreakLength] = useState(previousForm.breakLength);
  const [longBreakLength, setlongBreakLength] = useState(previousForm.longBreakLength);
  const [currentState, setCurrentState] = useState('pomodoro');
  const setPomodoro = () => {setCurrentState('pomodoro');};
  const setBreak = () => {setCurrentState('break');};
  const setLongBreak = () => {setCurrentState('long break');};

  const [autoStart, setAutoStart] = useState(previousForm.autoStart);

  // time management
  const [counterOnStart, setCounterOnStart] = useState(false);
  const [numberOfBreaks, setNumberOfBreaks] = useState(0);

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
  } = useTimer({ expiryTimestamp, onExpire: () => {}});

  const restartTimer = (state = '') => {
    console.log('restart', state === '' ? currentState : state);
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
            break;
        }
        break;
    }

    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + minutes * 60);
    restart(newTime, counterOnStart);
    setCounterOnStart(true);
  }

  useEffect(() => {
    if(seconds + minutes === 0 && autoStart && counterOnStart && !isRunning) {
      const nextState = (currentState === 'break' || currentState === 'long break') 
        ? 'pomodoro' 
        : (numberOfBreaks + 1) % 3 === 0 
          ? 'long break' 
          : 'break'; 

      console.log(nextState);
      setCurrentState(nextState);
      restartTimer(nextState);

      if(currentState === 'break' || currentState === 'long break') {
        setNumberOfBreaks(numberOfBreaks + 1);
      }
    }
  }, [isRunning])

  useEffect(() => {
    if(isRunning && !(seconds === 0 && minutes === 0)) {
      document.title = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`; 
    } else {
      document.title = 'Focused Time';
    }
 }, [seconds]);

  // user auth
  const [user] = useAuthState(auth);
  function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }

    return <button onClick={signInWithGoogle}><GoogleIcon className='icon' /> Sign in with Google</button>
  }
  function SignOut() {
    return auth.currentUser && (
      <button onClick={() => auth.signOut()}>Sign Out</button>
    )
  }

  const getForm = form => {
    setPomodoroLength(form.pomodoroLength);
    setBreakLength(form.breakLength);
    setlongBreakLength(form.longBreakLength);
    setAutoStart(form.autoStart);
  }

  useEffect(() => {
    restartTimer(currentState)
  }, [pomodoroLength, breakLength, longBreakLength]);

  return (
    <div className='App' >
      {
        currentPage === 'Timer' ?
          <Timer 
            time={`${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`}
            ratio={(minutes * 60 + seconds) / (60 * (currentState === 'pomodoro' ? pomodoroLength : (currentState === 'break' ? breakLength : (currentState === 'long break' ? longBreakLength : 25))))}
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
            sendForm={getForm}
            counterOnStart={counterOnStart}
          />
        : currentPage === 'Profile' ?
          <Profile 
            user={auth.currentUser}
            SignIn={SignIn}
            SignOut={SignOut}
            goToMenu={goToMenu}
            goToTimer={goToTimer}
            goToProfile={goToProfile}
          />
        : <Menu 
            goToTimer={goToTimer} 
          />
      }
    </div>
  );
}

export default App;