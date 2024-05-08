import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">LearningMS</Link>
      <nav>
        {username && (
          <>
            <span>@{username}</span>
            <Link to="https://www.classcentral.com/report/free-certificates/" target="_blank">
              Certificates
            </Link>
            <Link to="/create">Create post</Link>
            {/* Add a link to the admin dashboard if the user is an admin */}
            {userInfo.role === 'admin' && (
              <Link to="/admin">Admin Dashboard</Link>
            )}
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
