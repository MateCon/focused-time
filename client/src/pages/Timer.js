import React, { useState } from 'react';
import Navbar from './Navbar';

const Timer = ({time, isRunning, start, pause, resume, restart, setPomodoro, setBreak, setLongBreak, goToMenu, goToTimer, goToProfile}) => {
    const [hasStarted, setHasStarted] = useState(false);

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

                <div id='time-container' />
                <div id='time-conteiner-compleated' />
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
                                }}>Restart</button>
                            </>
                            
                    }

                </div>
            </div>
        </div>
    );
}

export default Timer;