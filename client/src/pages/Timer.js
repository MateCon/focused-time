import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import Navbar from './Navbar';
import Settings from './Settings';
import { ReactComponent as ClockBorder } from '../images/clock-border.svg';
import { ReactComponent as FullScreen } from '../images/full-screen.svg';
import { ReactComponent as Close } from '../images/close.svg';
import alarmKitchen from '../sounds/kitchen-alarm.mp3';


const Timer = ({time, ratio, isRunning, start, pause, resume, restart, setPomodoro, setBreak, setLongBreak, goToMenu, goToTimer, goToProfile}) => {
    const [hasStarted, setHasStarted] = useState(false);
    const [isFullscreenOn, setIsFullscreenOn] = useState(false);
    const [timerBackground, setTimerBackground] = useState('');
    const [playAlarm] = useSound(alarmKitchen);
    const [areSettingsVisible, setAreSettingsVisible] = useState(true);

    useEffect(() => {
        setTimerBackground(`conic-gradient(rgba(0, 0, 0, 0.4) ${360 - ratio * 360}deg, transparent calc(${360 - ratio * 360}deg + 0.5deg) 100%)`);
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

    const getForm = form => {}

    return (
        <div onKeyPress={handleKeyPress} tabIndex={0} style={{ outline: 'none' }} className={isFullscreenOn ? 'full-screen' : ''} >
            <Navbar goToMenu={goToMenu} goToTimer={goToTimer} goToProfile={goToProfile} />
            <div id='top-right'>
                {
                    isFullscreenOn 
                        ? <Close className='icon' onClick={() => setIsFullscreenOn()} />
                        : <FullScreen className='icon' onClick={() => setIsFullscreenOn(true)} />
                }
            </div>
            <div id='timer'>
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
                                setHasStarted(true);
                            }}>Start</button>
                            : <>
                                {
                                    isRunning
                                        ? <button onClick={pause}>Pause</button>
                                        : <button onClick={resume}>Resume</button>
                                }
                                <button onClick={() => {
                                    restart(); 
                                    setHasStarted(false);
                                }} id='restart-button' >Restart</button>
                            </>
                    }
                </div>
            </div>
            <Settings 
                areSettingsVisible={areSettingsVisible}
                sendForm={getForm}
            />
        </div>
    );
}

export default Timer;