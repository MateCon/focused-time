import React from 'react';
import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as Home } from '../images/home.svg';
import { ReactComponent as Clock } from '../images/clock.svg';
import { ReactComponent as Profile } from '../images/profile.svg';

const Navbar = (props) => {
    return (
        <div id='navbar'>
            <div>
                <Logo id='logo' onClick={props.goToMenu} />
                <p id='title' onClick={props.goToMenu}>Focused Time</p>
            </div>
            <div>
                <Home className='icon' onClick={props.goToMenu}/>
                <p>Home</p>
            </div>
            <div>
                <Clock className='icon' onClick={props.goToTimer} />
                <p>Clock</p>
            </div>
            <div>
                <Profile className='icon' onClick={props.goToProfile} />
                <p>Profile</p>
            </div>
        </div>
    );
}

export default Navbar;