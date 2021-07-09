import React from 'react';

const Timer = () => {
    return (
        <div id='timer'>
            <p id='time'>13:04</p>
            <div id='pomodoro-options-container'>
                <button id='pomodoro-selector'>Pomodoro</button>
                <button id='break-selector'>Break</button>
                <button id='long-break-selector'>Long break</button>
            </div>
            <div id='time-control-container'>
                <button id='start-button'>Start</button>
                <button id='pause-button'>Pause</button>
                <button id='restart-button'>Restart</button>
            </div>
        </div>
    );
}

export default Timer;