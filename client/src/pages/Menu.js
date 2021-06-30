import React from 'react';
import { ReactComponent as Logo } from '../images/logo.svg';

const Menu = () => {
    return (
        <div>
            <div id='background-text'>
                <p>POMODORO TIMER</p>
                <p>TIME MANAGEMENT</p>
            </div>
            <h1 id='title'>Focused Time</h1>
            <h2 id='subtitle'>By MateCon</h2>
            <Logo class='logo'/>
            <p id='start-link'>Start!</p>
            <p id='about-me'>About me</p>
        </div>
    );
}

export default Menu;