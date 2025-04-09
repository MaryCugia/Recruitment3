import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles/App.css';
import Home from './components/Home';
import About from './components/About';
import CandidatePortal from './components/CandidatePortal';
import RecruiterPortal from './components/RecruiterPortal';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppHeader() {
  const { currentUser, logout, getUserRole } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  return (
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
          {currentUser ? (
            <>
              <span className="welcome-text">Welcome, {currentUser.displayName || 'User'}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function AppContent() {
  return (
    <main className="main-content">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        
        <Route path="/candidate-portal" element={
          <ProtectedRoute>
            <CandidatePortal />
          </ProtectedRoute>
        } />
        
        <Route path="/recruiter-portal" element={
          <ProtectedRoute>
            <RecruiterPortal />
          </ProtectedRoute>
        } />
        
        <Route path="/about" element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        } />
      </Routes>
    </main>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <AppHeader />
          <AppContent />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
