import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import Navbar from './Navbar';
import Settings from './Settings';
import { ReactComponent as ClockBorder } from '../images/clock-border.svg';
import { ReactComponent as FullScreen } from '../images/full-screen.svg';
import { ReactComponent as Close } from '../images/close.svg';
import { ReactComponent as SettingsIcon } from '../images/settings.svg';
import alarmKitchen from '../sounds/kitchen-alarm.mp3';

const Timer = ({ time, ratio, isRunning, start, pause, resume, restart, setPomodoro, setBreak, setLongBreak, goToMenu, goToTimer, goToProfile, sendForm, counterOnStart, volume, addPomodoroToDB }) => {
    const [hasStarted, setHasStarted] = useState(false);
    const [isFullscreenOn, setIsFullscreenOn] = useState(false);
    const [timerBackground, setTimerBackground] = useState('');
    const [playAlarm] = useSound(alarmKitchen, {volume});
    const [areSettingsVisible, setAreSettingsVisible] = useState(false);

    useEffect(() => {
        setTimerBackground(ratio === 1 ? 'linear-gradient(transparent, transparent)' : `conic-gradient(rgba(0, 0, 0, 0.4) ${360 - ratio * 360}deg, transparent calc(${360 - ratio * 360}deg + 0.5deg) 100%)`);
        if(ratio === 0) {
            playAlarm();
        }
    }, [ratio]);

    const handleKeyPress = (event) => {
        if(event.key === ' ') {
            if(!hasStarted) {
                restart();
                start();
                setHasStarted(true);
            } else {
                if(!isRunning) {
                    resume();
                } else {
                    pause();
                }
            }
        } else if(event.key === 'r') {
            if(hasStarted) {
                addPomodoroToDB(false);
                restart();
                setHasStarted(false);
            }
        }
    }

    // this is for handling the escape key
    useEffect(() => {
        const handleEsc = (event) => {
           if(event.keyCode === 27) {
            setIsFullscreenOn(false);
          }
        };
        window.addEventListener('keydown', handleEsc);
    
        return() => {
          window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const closeSettings = () => setAreSettingsVisible(false);

    const getForm = form => {
        sendForm(form);
        setHasStarted(false);
    }

    useEffect(() => {
        console.log(counterOnStart, hasStarted);
        if(counterOnStart >= 1) {
            setHasStarted(true);
        } else {
            setHasStarted(false);
        }
    }, [counterOnStart])

    return (
        <div onKeyPress={handleKeyPress} tabIndex={0} style={{ outline: 'none' }} className={isFullscreenOn ? 'full-screen' : ''} >
            <Navbar goToMenu={goToMenu} goToTimer={goToTimer} goToProfile={goToProfile} />
            <div id='top-right'>
                {
                    isFullscreenOn
                        ? <Close className='icon' onClick={() => setIsFullscreenOn()} />
                        : <>
                            <FullScreen className='icon' onClick={() => setIsFullscreenOn(true)} />
                            <SettingsIcon className='icon' onClick={() => setAreSettingsVisible(true)} style={{ marginTop: '10px' }} />
                        </>
                }
            </div>
            <div id='timer'>
                <div className='show-current' />
                {
                    !isFullscreenOn ? <div id='pomodoro-options-container'>
                        <button id='pomodoro-selector' onClick={() => {
                            setPomodoro();
                            setHasStarted(false);
                        }}>Pomodoro</button>
                        <button id='break-selector' onClick={() => {
                            setBreak();
                            setHasStarted(false);
                        }}>Break</button>
                        <button id='long-break-selector' onClick={() => {
                            setLongBreak();
                            setHasStarted(false);
                        }}>Long break</button>
                    </div>
                    : null
                }

                <div id='time-container' style={{ 'background':timerBackground }} />
                <ClockBorder id='time-conteiner-compleated' />
                <p id='time'>{time}</p>

                <div id={isFullscreenOn ? 'time-control-container-expanded' : 'time-control-container'}>
                    {
                        !hasStarted
                            ? <button onClick={() => {
                                restart();
                                start();
                                setHasStarted(0);
                            }}>Start</button>
                            : <>
                                {
                                    isRunning
                                        ? <button onClick={pause}>Pause</button>
                                        : <button onClick={resume}>Resume</button>
                                }
                                <button onClick={() => {
                                    addPomodoroToDB(false);
                                    restart(); 
                                    setHasStarted(0);
                                }} id='restart-button'>Restart</button>
                            </>
                    }
                </div>
            </div>
            <Settings 
                sendForm={getForm}
                move={areSettingsVisible}
                close={closeSettings}
            />
        </div>
    );
}

export default Timer;