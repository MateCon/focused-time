import React, { useEffect, useState } from 'react';
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

const Settings = ({ isShown, sendForm, move, close }) => {
    const previousForm = (localStorage.hasOwnProperty('config')) ? JSON.parse(localStorage.config): defaultConfig;

    const [pomodoroLength, setPomodoroLength] = useState(previousForm.pomodoroLength);
    const [breakLength, setBreakLength] = useState(previousForm.breakLength);
    const [longBreakLength, setLongBreakLength] = useState(previousForm.longBreakLength);
    const [autoStart, setAutoStart] = useState(previousForm.autoStart);
    const [longBreakInterval, setLongBreakInterval] = useState(previousForm.longBreakInterval);
    const [volume, setVolume] = useState(previousForm.volume);
    const [alarm, setAlarm] = useState(previousForm.alarm);

    const handlePomodoroChange = event => setPomodoroLength(event.target.value);
    const handleBreakChange = event => setBreakLength(event.target.value);
    const handleLongBreakChange = event => setLongBreakLength(event.target.value);
    const handleAutoStartChange = () => setAutoStart(!autoStart);
    const handleLongBreakIntervalChange = event => setLongBreakInterval(event.target.value);
    const handleVolumeChange = event => setVolume(event.target.value);
    const handleAlarmChange = event => setAlarm(event.target.value);

    const [animations, setAnimations] = useState(0);
    useEffect(() => {
        console.log(move);
        setAnimations(animations + 1);
    }, [move]);

    const submit = event => {
        event.preventDefault();
        const config = {
            pomodoroLength: parseInt(pomodoroLength),
            breakLength: parseInt(breakLength),
            longBreakLength: parseInt(longBreakLength),
            autoStart,
            longBreakInterval: parseInt(longBreakInterval),
            volume: parseInt(volume),
            alarm: alarm
        };
        localStorage.setItem('config', JSON.stringify(config));
    }

    return <form id='Settings' onSubmit={submit} style={animations > 1 ? (move === true ? {
        animationName: 'moveFoward'
    } : {
        animationName: 'moveBackward'
    }) : null}>
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
            <div className='row'>
                <div>
                    <label>Volume</label>
                    <input type='range' min='0' max='100' step='1' value={volume} onChange={handleVolumeChange} />
                </div>
                <div>
                    <label>Alarm sound</label>
                    <select name='alarm' value={alarm} onChange={handleAlarmChange}>
                        <option value='Kitchen Alarm'>Kitchen Alarm</option>
                        <option value='Gong'>Gong</option>
                    </select>
                </div>
            </div>
            <div className='row' id='last-row'>
                <button id='submit' type='submit'>Save</button>
                <p id='close' onClick={close}>Close</p>
            </div>
        </div>
    </form>;
}

export default Settings;