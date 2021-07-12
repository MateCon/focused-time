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
    restart(newTime, false);
  }

  useEffect(() => {
    restartTimer('pomodoro');
  }, [])

  useEffect(() => {
    if(isRunning) {
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