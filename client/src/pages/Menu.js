import React, { useRef } from 'react';
import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as Link } from '../images/link.svg';
import { ReactComponent as ScrollBtn } from '../images/scroll-btn.svg';
import { ReactComponent as ScrollBtnReversed } from '../images/scroll-btn-reversed.svg';
import { ReactComponent as Circle } from '../images/circle.svg';
import { ReactComponent as BackgroundLogo } from '../images/background-logo.svg';
import { ReactComponent as DashLine } from '../images/dash-line.svg';

const Menu = ({goToTimer}) => {
    const topRef = useRef(null);
    const bottomRef = useRef(null);

    return (
        <div>
            <div ref={topRef} />
            <div className='Menu'>
                <div id='background-text'>
                    <p className='first'>POMODORO TIMER</p>
                    <p className='second'>TIME MANAGEMENT</p>
                </div>
                <h1 id='title'>Focused Time</h1>
                <h2 id='subtitle'>By MateCon</h2>
                <Logo id='logo'/>
                <p id='start-link' onClick={goToTimer}>Start!</p>
                <div id='about-me'>
                    <Link id='link' />
                    <a href='https://github.com/matecon' target='blanc'>About me</a>
                </div>
                <ScrollBtn id='scroll-btn' onClick={() => bottomRef.current.scrollIntoView({ behavior: "smooth" })} />
            </div>
            <div className='Explanation'>
                <BackgroundLogo id='background-logo' />
                <DashLine id='dash-line' />
                <ScrollBtnReversed id='scroll-btn' onClick={() => topRef.current.scrollIntoView({ behavior: "smooth" })} />
                <div className='row' style={{marginTop: '120px', marginLeft: '-60px'}}>
                    <Circle style={{marginTop: '5px', marginRight: '10px'}} />
                    <h1>Focused Time</h1>
                </div>
                <p>This web application will help you organize and track your time using the 
                    <a href='https://francescocirillo.com/pages/pomodoro-technique' target='blanc'> Pomodoro Technique</a>
                    , a time management method made by <strong>Francesco Cirillo</strong> that uses a timer to break down work into intervals separated by short breaks.</p>
                <div className='row' style={{marginTop: '70px', marginLeft: '-60px'}}>
                    <Circle style={{marginTop: '-3px', marginRight: '10px'}} />
                    <h2>How it works?</h2>
                </div>
                <ol style={{marginLeft: '20px'}}>
                    <li><strong>Decide on the task</strong> to be done.</li>
                    <li><strong>Set the pomodoro</strong> timer.</li>
                    <li><strong>Work</strong> on the task.</li>
                    <li>When the timer rings end work and take a <strong>short break</strong></li>
                    <li>Go back to Step 2 and <strong>repeat.</strong></li>
                    <li>Every three pomodoros take a <strong>long break.</strong></li>
                </ol>
                <div ref={bottomRef} />
            </div>
        </div>
    );
}

export default Menu;