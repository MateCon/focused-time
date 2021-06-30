import React from 'react';
import { ReactComponent as Logo } from '../images/logo.svg';

const Menu = () => {
    return (
        <div className='Menu'>
            <div id='background-text'>
                <p class='first'>POMODORO TIMER</p>
                <p class='second'>TIME MANAGEMENT</p>
            </div>
            <h1 id='title'>Focused Time</h1>
            <h2 id='subtitle'>By MateCon</h2>
            <Logo id='logo'/>
            <p id='start-link'>Start!</p>
            <div id='about-me'>
                <a href='https://github.com/matecon' target='blanc'>About me</a>
            </div>
        </div>
    );
}

export default Menu;