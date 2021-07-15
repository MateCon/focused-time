import React from 'react';
import Navbar from './Navbar';

const Profile = ({ user, SignIn, SignOut, goToMenu, goToTimer, goToProfile }) => {
    return <div id='profile'>
        <Navbar goToMenu={goToMenu} goToTimer={goToTimer} goToProfile={goToProfile} />
        <div className='show-current' />
        {
            user
                ? <div id='signed-in'>
                    <SignOut />
                    <img src={user.photoURL} alt='Google account' />
                    <p className='title'>{user.displayName}</p>
                    <i className='email'>{user.email}</i>
                </div>
                : <div id='signed-out'>
                    <SignIn />
                </div>
        }
    </div>;
}

export default Profile;