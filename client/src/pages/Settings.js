import React, { useState, useEffect } from 'react';

const Settings = ({ isShown, sendForm }) => {
    const [pomodoroLength, setPomodoroLength] = useState('');
    const [breakLength, setBreakLength] = useState('');
    const [longBreakLength, setLongBreakLength] = useState('');
    const [autoStart, setAutoStart] = useState(true);
    const [longBreakInterval, setLongBreakInterval] = useState('');

    const handlePomodoroChange = event => setPomodoroLength(event.target.value);
    const handleBreakChange = event => setBreakLength(event.target.value);
    const handleLongBreakChange = event => setLongBreakLength(event.target.value);
    const handleAutoStartChange = event => setAutoStart(event.target.value);
    const handleLongBreakIntervalChange = event => setLongBreakInterval(event.target.value);    

    const submit = event => {
        event.preventDefault();
        console.log({

        });
    }

    return <form id='Settings' onSubmit={submit}>
        <p class='title'>Settings</p>
        <div>
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
                <input value={longBreakLength} onChange={handleAutoStartChange} type='number' placeholder='' />
            </div>
            <div>
                <label>Auto start breaks and pomodoros</label>
                <label class="switch">
                    <input value={autoStart} onChange={handleBreakChange} type="checkbox" placeholder='' />
                    <span class="slider round"></span>
                </label>
            </div>
            <div>
                <label>Long break interval</label>
                <input onChange={handleLongBreakIntervalChange} type='number' placeholder='' />
            </div>
            <button type='submit'>Save</button>
        </div>
        <p id='close'>Close</p>
    </form>;
}

export default Settings;