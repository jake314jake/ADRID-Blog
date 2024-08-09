import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import UserAvatar from './UserAvatar';
import Notification from './Notfication';
import "./Navbar.scss";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className='nav-container'>
      <div className='left-container'>
        <UserAvatar userName={currentUser ? currentUser.user.username : null} />
      </div>
      <div className='right-container'>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {currentUser ? (
          <Link to="/Login" onClick={logout}>Logout</Link>
        ) : (
          <Link to="/Login">Login</Link>
        )}
        {currentUser && <Notification username={currentUser.user.username} />}
      </div>
    </div>
  );
};

export default Navbar;
