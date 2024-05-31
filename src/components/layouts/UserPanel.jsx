import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AvatarImage from '../../assets/avatar.jpg';
import "../../styles/userPanel.css";

const UserPanel = () => {
   const [loggedInUser, setLoggedInUser] = useState(null);

   useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    alert('You have been logged out.');
  };

  return (
    <div className="user-panel">
      <div className='user-name'>
        {loggedInUser && (
            <div className="user-info">
              <img src={AvatarImage} alt="User Avatar" class="avatar-acc" />
              <div class='user-info-container'>
              <span className="logged-user-name">{loggedInUser.name}</span>
              <li className='acc-link'><Link to="/account">My Account</Link></li>
              </div>
            </div>
          )}
          {!loggedInUser && (
            <img
              src={AvatarImage}
              alt="User Avatar"
              className="avatar-acc"
            />
          )}
      </div>
      <ul className='user-menu-ul'>

        <li className='user-menu-li'><Link to="/UserReservations">Reservations</Link></li>
        <li className='user-menu-li'><Link to="/messages">Messages</Link></li>
        <li className='user-menu-li'><Link to="/favorites">Favorites</Link></li>
        <li className='user-menu-li'><Link to="/UserOpinions">My Opinions</Link></li>
        <li className='user-menu-li' onClick={handleLogout}><Link to='/login'>LogOut</Link></li>
      </ul>
    </div>
  );
};

export default UserPanel;
