import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting to login with:', formData.email);
      // Firebase login
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error code:', error.code);
      let errorMessage = 'Failed to log in';
      
      // Handle specific Firebase auth errors with user-friendly messages
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          errorMessage = 'Incorrect email or password';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed login attempts. Please try again later';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection';
          break;
        default:
          errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Debug function to show stored roles
  const handleShowRoles = () => {
    const roles = localStorage.getItem('fairhire_user_roles');
    console.log('Current stored roles:', roles ? JSON.parse(roles) : 'No roles found');
    alert('Roles are logged to the console. Press F12 to view.');
  };

  // Debug function to clear stored roles
  const handleClearRoles = () => {
    localStorage.removeItem('fairhire_user_roles');
    console.log('User roles have been cleared');
    alert('All user roles have been cleared. You will need to sign up again.');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </div>
        <button 
          type="submit" 
          className="login-button"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="auth-redirect">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </div>

      {/* Debug tools - remove in production */}
      <div className="debug-tools">
        <button onClick={handleShowRoles} className="debug-button">Check Roles</button>
        <button onClick={handleClearRoles} className="debug-button">Clear Roles</button>
      </div>
    </div>
  );
};

export default Login; 