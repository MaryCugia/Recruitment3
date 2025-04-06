import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">FairHire AI</Link>
        </div>
        <nav className="nav-links">
          <Link to="/candidate">Candidate Portal</Link>
          <Link to="/recruiter">Recruiter Portal</Link>
          <Link to="/about">About Us</Link>
        </nav>
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/register" className="register-btn">Register</Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 