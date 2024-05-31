import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserPanel from './UserPanel';
import AvatarImage from '../../assets/avatar.jpg';
import "../../styles/navbar.css";

const Navbar = () => {
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
 };



  const toggleUserPanel = () => {
    setIsUserPanelOpen(!isUserPanelOpen);
  };


  return (
    <header>
      <nav>
        <div className="navbar-left">
         <button className="hamburger-menu" onClick={toggleMenu}>☰</button>
          <ul className='main-menu' style={{ display: isMenuOpen ? 'block' : 'none' }}>
            <li className='menu-link'><Link to="/">Home</Link></li>
            <li className='menu-link'><Link to="/restaurants">Restaurants</Link></li>
            <li className='menu-link'><Link to="/login">Login</Link></li>
            <li className='menu-link'><Link to="/register">Register</Link></li>
          </ul>
        </div>
        <div className="navbar-right">
            <img
              src={AvatarImage}
              alt=""
              className="avatar"
              onClick={toggleUserPanel}
              
            />
        </div>
      </nav>
      {isUserPanelOpen && <UserPanel />}
    </header>
  );
};

export default Navbar;
