import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles/App.css';
import Home from './components/Home';
import About from './components/About';
import CandidatePortal from './components/CandidatePortal';
import RecruiterPortal from './components/RecruiterPortal';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="header-container">
            <Link to="/" className="logo">
              <h1>FairHire</h1>
            </Link>
            <nav className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/candidate-portal">For Candidates</Link>
              <Link to="/recruiter-portal">For Recruiters</Link>
              <Link to="/about">About Us</Link>
            </nav>
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Register</Link>
            </div>
          </div>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/candidate-portal" element={<CandidatePortal />} />
            <Route path="/recruiter-portal" element={<RecruiterPortal />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
