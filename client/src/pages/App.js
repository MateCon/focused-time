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

import Axios from 'axios';

import KitchenAlarm from '../sounds/kitchen-alarm.wav';
import Gong from '../sounds/gong.wav';
import Bell from '../sounds/bell.wav';

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
  const [currLength, setCurrLength] = useState(0);

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

  const restartTimer = (state = '', canStart = false) => {
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
    newTime.setSeconds(newTime.getSeconds() + minutes * 6);
    restart(newTime, (counterOnStart >= 1 && autoStart && canStart));
    setCounterOnStart(autoStart);
    setCurrLength(0);
  }
  
  // sound
  const getSoundFile = sound => {
    switch(sound) {
      case 'Kitchen Alarm':
        return KitchenAlarm;
      case 'Gong':
        return Gong;
      case 'Bell':
        return Bell;
    }
  }

  const [currentAlarm, setCurrentAlarm] = useState(getSoundFile(previousForm.alarm));
  const [volume, setVolume] = useState(previousForm.volume/8);

  const addPomodoroToDB = (was_completed) => {
    if(auth.currentUser === null || currLength < 50) return;
    const currDate = new Date();
    Axios.post("http://localhost:3001/createPomodoro", {
      user_id: auth.currentUser.email, 
      seconds: currLength,
      date: currDate.getFullYear() + '-' + (currDate.getMonth() < 10 ? '0' : '') + currDate.getMonth() + '-' + (currDate.getDate() < 10 ? '0' : '') + currDate.getDate(),
      time: (currDate.getHours() < 10 ? '0' : '') + currDate.getHours() + ':' + (currDate.getMinutes() < 10 ? '0' : '') + currDate.getMinutes() + ':' + (currDate.getSeconds() < 10 ? '0' : '') + currDate.getSeconds(), 
      was_completed: was_completed, 
      is_break: currentState === 'pomodoro' ? 0 : 1
    })
  }
  
  const handleIsRunning = () => {
    if(seconds + minutes === 0 && counterOnStart >= 0 && !isRunning) {
      if(counterOnStart >= 0) {
        addPomodoroToDB(true);
      }
      const nextState = (currentState === 'break' || currentState === 'long break') 
        ? 'pomodoro' 
        : (numberOfBreaks + 1) % 3 === 0 
          ? 'long break' 
          : 'break'; 

      setCurrentState(nextState);
      restartTimer(nextState, true);

      if(currentState === 'break' || currentState === 'long break') {
        setNumberOfBreaks(numberOfBreaks + 1);
      }
    }
  }

  useEffect(() => {
    handleIsRunning();
  }, [isRunning])

  useEffect(() => {
    setCurrLength(currLength + 1);
    if(isRunning && !(seconds === 0 && minutes === 0)) {
      document.title = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`; 
    } else {
      document.title = 'Focused Time';
    }
 }, [seconds]);

  // user auth
  const addUserToDB = (email, name) => {
    Axios.post("http://localhost:3001/createUser", {
      email: email,
      name: name
    })
  }

  const [user] = useAuthState(auth);
  function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider).then(() => addUserToDB(auth.currentUser.email, auth.currentUser.displayName));
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
    setCurrentAlarm(getSoundFile(form.alarm));
    setVolume(form.volume/8);
    setCounterOnStart(-1);
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
            ratio={(minutes * 6 + seconds) / (6 * (currentState === 'pomodoro' ? pomodoroLength : (currentState === 'break' ? breakLength : (currentState === 'long break' ? longBreakLength : 25))))}
            isRunning={isRunning}
            start={() => {start(); setCounterOnStart(1);}}
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
            alarmFile={currentAlarm}
            volume={volume}
            addPomodoroToDB={addPomodoroToDB}
            autoStart={autoStart}
            handleIsRunning={handleIsRunning}
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