import React, { useState } from 'react';
import Navbar from './Navbar';

const Timer = ({time, isRunning, start, pause, resume, restart}) => {
    const [hasStarted, setHasStarted] = useState(false);

    return (
        <div>
            <Navbar />
            <div id='timer'>
                <div id='pomodoro-options-container'>
                    <button id='pomodoro-selector'>Pomodoro</button>
                    <button id='break-selector'>Break</button>
                    <button id='long-break-selector'>Long break</button>
                </div>

                <div id='time-container' />
                <div id='time-conteiner-compleated' />
                <p id='time'>{time}</p>

                <div id='time-control-container'>
                    {
                        !hasStarted
                            ? <button onClick={() => {
                                start();
                                setHasStarted(true);
                            }}>Start</button>
                            : (
                                isRunning
                                    ? <button onClick={pause}>Pause</button>
                                    : <button onClick={resume}>Resume</button>
                            )
                            
                    }
                    <button onClick={() => {
                        restart(); 
                        setHasStarted(false);
                    }}>Restart</button>
                </div>
            </div>
        </div>
    );
}

export default Timer;