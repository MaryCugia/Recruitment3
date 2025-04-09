// src/services/api.js

// Base URL for API calls - uncomment one of these based on your setup
// For development with backend on same machine but different port:
const API_URL = 'http://localhost:5000/api';
// For development with frontend proxy:
// const API_URL = '/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// API service methods
const api = {
  // Auth endpoints
  auth: {
    login: async (credentials) => {
      try {
        console.log('Attempting to connect to:', `${API_URL}/auth/login`);
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });
        return await handleResponse(response);
      } catch (error) {
        console.error('Login API error:', error);
        // Check if it's a network error
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
          throw new Error('Cannot connect to server. Please check if the backend is running.');
        }
        throw error;
      }
    },
    
    register: async (userData) => {
      try {
        console.log('Attempting to connect to:', `${API_URL}/auth/register`);
        console.log('Attempting to register with:', userData);
        
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        }).catch(error => {
          console.error('Fetch error:', error);
          throw new Error('Cannot connect to server. Please check if the backend is running.');
        });
        
        console.log('Register response status:', response.status);
        
        // Check if response is empty
        const clone = response.clone();
        const text = await clone.text();
        console.log('Response body:', text);
        
        // If empty response but status is ok, return a default successful response
        if (!text && response.ok) {
          return {
            message: 'User registered successfully',
            user: userData,
            token: 'temporary-token'
          };
        }
        
        return await handleResponse(response, text);
      } catch (error) {
        console.error('Register API error:', error);
        // Provide more helpful error message for network issues
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
          throw new Error('Cannot connect to server. Please check if the backend is running.');
        }
        throw error;
      }
    }
  },
  
  // Protected endpoints - require authentication
  protected: {
    // Example of a protected endpoint
    getProfile: async () => {
      try {
        const response = await fetch(`${API_URL}/profile`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
        return await handleResponse(response);
      } catch (error) {
        console.error('Profile API error:', error);
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
          throw new Error('Cannot connect to server. Please check if the backend is running.');
        }
        throw error;
      }
    },
    
    // Add other protected endpoints as needed
  }
};

// Handle API responses uniformly
async function handleResponse(response, textResponse) {
  try {
    // If text response was already fetched, use it
    const data = textResponse ? 
      (textResponse ? JSON.parse(textResponse) : {}) : 
      await response.json();
    
    if (!response.ok) {
      const error = data.error || data.message || 'Something went wrong';
      throw new Error(error);
    }
    
    return data;
  } catch (error) {
    // If JSON parsing fails
    if (error.name === 'SyntaxError') {
      console.error('Invalid JSON response:', error);
      throw new Error('Server returned an invalid response. Please try again later.');
    }
    throw error;
  }
}

export default api;