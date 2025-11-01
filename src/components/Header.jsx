// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../store/authSlice';

import Search from './Search';
import SettingsToggle from './SettingsToggle';
import Login from './Login'; // <-- 1. Import Login component

function Header() {
  const dispatch = useDispatch();
  // 2. Get user from auth slice
  const user = useSelector((state) => state.auth.user); 

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <header>
      <Link to="/">
        <h1>Weather Dashboard</h1>
      </Link>
      <Search />
      <div className="header-right"> {/* 3. Group buttons */}
        <SettingsToggle />

        {/* 4. Show Login or User Profile */}
        {!user ? (
          <Login />
        ) : (
          <div className="user-profile">
            <img src={user.picture} alt={user.name} />
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;