import React, { useState } from 'react';
import { ReactComponent as Compleated } from '../images/stats/compleated.svg';
import { ReactComponent as Canceled } from '../images/stats/canceled.svg';
import { ReactComponent as Breaks } from '../images/stats/breaks.svg';
import { ReactComponent as TotalHours } from '../images/stats/total-hours.svg';
import { ReactComponent as AVGPomodoroLength } from '../images/stats/avg-pomodoro-length.svg';

const Stats = () => {
    const [stats, getStats] = useState({
        compleated: 0,
        canceled: 0,
        breaks: 0,
        totalHours: 0,
        avgPomodoroLength: '00:00'
    });

    return <div id='stats'>
        <div className='row'>
            <div className='icon-container'>
                <p>{stats.compleated}</p>
                <Compleated />
                <i>Compleated pomodoros</i>
            </div>
            <div className='icon-container'>
                <p>{stats.canceled}</p>
                <Canceled />
                <i>Canceled pomodoros</i>
            </div>
            <div className='icon-container'>
                <p>{stats.breaks}</p>
                <Breaks />
                <i>Compleated beraks</i>
            </div>
        </div>
        <div className='row'>
            <div className='icon-container'>
                <p>{stats.totalHours}</p>
                <TotalHours />
                <i>Total hours working</i>
            </div>
            <div className='icon-container'>
                <p>{stats.avgPomodoroLength}</p>
                <AVGPomodoroLength />
                <i>Agarage pomodoro length</i>
            </div>
        </div>
        <div className='row'>

        </div>
    </div>;
}

export default Stats;