import React from 'react';
import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as Home } from '../images/home.svg';
import { ReactComponent as Clock } from '../images/clock.svg';
import { ReactComponent as Profile } from '../images/profile.svg';

const Navbar = () => {
    return (
        <div id='navbar'>
            <div>
                <Logo id='logo' />
                <p id='title'>Focused Time</p>
            </div>
            <div>
                <Home className='icon' />
                <p>Home</p>
            </div>
            <div>
                <Clock className='icon' />
                <p>Clock</p>
            </div>
            <div>
                <Profile className='icon' />
                <p>Profile</p>
            </div>
        </div>
    );
}

export default Navbar;