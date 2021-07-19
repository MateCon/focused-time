import React, { useState, useEffect } from 'react';
import { ReactComponent as Completed } from '../images/stats/completed.svg';
import { ReactComponent as Canceled } from '../images/stats/canceled.svg';
import { ReactComponent as Breaks } from '../images/stats/breaks.svg';
import { ReactComponent as TotalHours } from '../images/stats/total-hours.svg';
import { ReactComponent as AVGPomodoroLength } from '../images/stats/avg-pomodoro-length.svg';
import Axios from 'axios';

const Stats = ({user}) => {
    const secondsToHMS = seconds => {
        let minutes = 0;

        while(seconds >= 60) {
            minutes++;
            seconds -= 60;
        }

        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }

    const getStatsFromDB = () => {
        Axios.get("http://localhost:3001/getStats", {
          params: { email: user.email }
        }).then(response => {
            const data = response.data[0][0];
            console.log(data , data.total_seconds , data.pomodoros);
            setStats({
                completed: data.pomodoros,
                canceled: data.canceled,
                breaks: data.breaks,
                totalHours: Math.floor(data.total_seconds / 3600),
                avgPomodoroLength: secondsToHMS(Math.round(data.total_seconds / data.pomodoros))
            });
        });
    }

    const [stats, setStats] = useState({
        completed: 0,
        canceled: 0,
        breaks: 0,
        totalHours: 0,
        avgPomodoroLength: '00:00'
    });

    useEffect(() => {
        getStatsFromDB();
    }, [])

    return <div id='stats'>
        <div className='row'>
            <div className='icon-container'>
                <p>{stats.completed}</p>
                <Completed />
                <i>Completed pomodoros</i>
            </div>
            <div className='icon-container'>
                <p>{stats.canceled}</p>
                <Canceled />
                <i>Canceled pomodoros</i>
            </div>
            <div className='icon-container'>
                <p>{stats.breaks}</p>
                <Breaks />
                <i>Completed beraks</i>
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
                <i>Average pomodoro length</i>
            </div>
        </div>
        <div className='row'>

        </div>
    </div>;
}

export default Stats;