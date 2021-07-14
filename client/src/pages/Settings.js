import React, { useState } from 'react';
const localStorage = window.localStorage;

const defaultConfig = {
    pomodoroLength: 25,
    breakLength: 5,
    longBreakLength: 15,
    autoStart: false,
    longBreakInterval: 3 
};

const Settings = ({ isShown, sendForm }) => {
    const previousForm = (localStorage.hasOwnProperty('config')) ? JSON.parse(localStorage.config): defaultConfig;
    console.log(localStorage.config, previousForm);
    const [pomodoroLength, setPomodoroLength] = useState(previousForm.pomodoroLength);
    const [breakLength, setBreakLength] = useState(previousForm.breakLength);
    const [longBreakLength, setLongBreakLength] = useState(previousForm.longBreakLength);
    const [autoStart, setAutoStart] = useState(previousForm.autoStart);
    const [longBreakInterval, setLongBreakInterval] = useState(previousForm.longBreakInterval);

    const handlePomodoroChange = event => setPomodoroLength(event.target.value);
    const handleBreakChange = event => setBreakLength(event.target.value);
    const handleLongBreakChange = event => setLongBreakLength(event.target.value);
    const handleAutoStartChange = () => setAutoStart(!autoStart);
    const handleLongBreakIntervalChange = event => setLongBreakInterval(event.target.value);

    const submit = event => {
        event.preventDefault();
        const config = {
            pomodoroLength: parseInt(pomodoroLength),
            breakLength: parseInt(breakLength),
            longBreakLength: parseInt(longBreakLength),
            autoStart,
            longBreakInterval: parseInt(longBreakInterval)
        };
        localStorage.setItem('config', JSON.stringify(config));
    }

    return <form id='Settings' onSubmit={submit}>
        <p className='title'>Settings</p>
        <div>
            <div className='row'>
                <div>
                    <label>Pomodoro length</label>
                    <input value={pomodoroLength} onChange={handlePomodoroChange} type='number' placeholder='' />
                </div>
                <div>
                    <label>Break length</label>
                    <input value={breakLength} onChange={handleBreakChange} type='number' placeholder='' />
                </div>
                <div>
                    <label>Long break length</label>
                    <input value={longBreakLength} onChange={handleLongBreakChange} type='number' placeholder='' />
                </div>
            </div>
            <div className='row'>
                <div>
                    <label>Auto start breaks and pomodoros</label>
                    <label className="switch">
                        <input defaultChecked={autoStart} onChange={handleAutoStartChange} type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
                <div>
                    <label>Long break interval</label>
                    <input value={longBreakInterval} onChange={handleLongBreakIntervalChange} type='number' placeholder='' />
                </div>
            </div>
            <div className='row' id='last-row'>
                <button id='submit' type='submit'>Save</button>
                <p id='close'>Close</p>
            </div>
        </div>
    </form>;
}

export default Settings;