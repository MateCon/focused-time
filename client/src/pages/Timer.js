import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import Navbar from './Navbar';
import { ReactComponent as ClockBorder } from '../images/clock-border.svg';
import alarmKitchen from '../sounds/kitchen-alarm.mp3';


const Timer = ({time, ratio, isRunning, start, pause, resume, restart, setPomodoro, setBreak, setLongBreak, goToMenu, goToTimer, goToProfile}) => {
    const [hasStarted, setHasStarted] = useState(false);
    const [timerBackground, setTimerBackground] = useState('');
    const [playAlarm] = useSound(alarmKitchen);

    useEffect(() => {
        setTimerBackground(`conic-gradient(rgba(0, 0, 0, 0.4) ${360 - ratio * 360}deg, transparent calc(${360 - ratio * 360}deg + 0.5deg) 100%)`);
        if(ratio === 0) {
            playAlarm();
        }
    }, [ratio]);

    return (
        <div>
            <Navbar goToMenu={goToMenu} goToTimer={goToTimer} goToProfile={goToProfile} />
            <div id='timer'>
                <div id='pomodoro-options-container'>
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

                <div id='time-container' style={{ 'background':timerBackground }} />
                <ClockBorder id='time-conteiner-compleated' />
                <p id='time'>{time}</p>

                <div id='time-control-container'>
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
        </div>
    );
}

export default Timer;