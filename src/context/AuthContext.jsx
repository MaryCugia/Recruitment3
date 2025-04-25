import { createContext, useState, useEffect, useContext } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

// Key for role storage
const ROLE_STORAGE_KEY = 'fairhire_user_roles';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRoles, setUserRoles] = useState({});

  // Load roles from localStorage
  useEffect(() => {
    const storedRoles = localStorage.getItem(ROLE_STORAGE_KEY);
    if (storedRoles) {
      try {
        setUserRoles(JSON.parse(storedRoles));
        console.log('Loaded user roles from storage:', JSON.parse(storedRoles));
      } catch (err) {
        console.error('Error parsing stored roles:', err);
        // Initialize with empty object if parse fails
        setUserRoles({});
      }
    }
  }, []);

  // Save a role for a user
  const saveUserRole = (userId, role) => {
    const updatedRoles = { 
      ...userRoles, 
      [userId]: role 
    };
    
    // Update state
    setUserRoles(updatedRoles);
    
    // Save to localStorage
    localStorage.setItem(ROLE_STORAGE_KEY, JSON.stringify(updatedRoles));
    console.log('Saved user role:', userId, role);
    console.log('Updated roles object:', updatedRoles);
  };

  // Sign up with email and password
  const signup = async (email, password, name, role) => {
    try {
      console.log('Creating user account in Firebase...');
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', userCredential.user.uid);
      
      // Update the user profile to include the name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      console.log('User profile updated with name:', name);
      
      // Store the user role
      saveUserRole(userCredential.user.uid, role);
      console.log('User role saved:', role);
      
      return userCredential.user;
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  };

  // Sign in with email and password
  const login = async (email, password) => {
    try {
      console.log('Attempting to sign in with Firebase...');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful for user:', userCredential.user.uid);
      return userCredential.user;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      console.log('Signing out of Firebase...');
      await signOut(auth);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  // Get user role
  const getUserRole = (user) => {
    if (!user) return null;
    
    const role = userRoles[user.uid] || 'candidate'; // Default to candidate
    console.log('Retrieved user role for', user.uid, ':', role);
    console.log('All user roles:', userRoles);
    return role;
  };

  // Listen for auth state changes
  useEffect(() => {
    console.log('Setting up Firebase auth state listener...');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user.uid);
        console.log('User display name:', user.displayName);
        console.log('Current user role:', getUserRole(user));
      } else {
        console.log('User is signed out');
      }
      
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [userRoles]); // Add userRoles as dependency

  const value = {
    currentUser,
    signup,
    login,
    logout,
    getUserRole,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}; 