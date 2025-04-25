import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles/App.css';
import Home from './components/Home';
import About from './components/About';
import CandidatePortal from './components/CandidatePortal';
import RecruiterPortal from './components/RecruiterPortal';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppHeader() {
  const { currentUser, logout, getUserRole } = useAuth();
  
  // Get user role if logged in
  const userRole = currentUser ? getUserRole(currentUser) : null;
  const isRecruiter = userRole === 'recruiter';
  
  // Debug logging
  useEffect(() => {
    if (currentUser) {
      console.log('AppHeader - Current user:', currentUser.uid);
      console.log('AppHeader - User role:', userRole);
      console.log('AppHeader - Is recruiter:', isRecruiter);
    }
  }, [currentUser, userRole, isRecruiter]);
  
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
          
          {/* Always show candidate portal link */}
          <Link to="/candidate-portal">For Candidates</Link>
          
          {/* Only show recruiter portal link to recruiters */}
          {isRecruiter && (
            <Link to="/recruiter-portal">Recruiter Admin</Link>
          )}
          
          <Link to="/about">About Us</Link>
        </nav>
        <div className="auth-buttons">
          {currentUser ? (
            <>
              <span className="welcome-text">
                Welcome, {currentUser.displayName || 'User'} 
                {isRecruiter && <span className="role-badge">Admin</span>}
              </span>
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
          <RoleProtectedRoute allowedRoles={['recruiter']}>
            <RecruiterPortal />
          </RoleProtectedRoute>
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
