import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, getUserRole, loading } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // Get user role
  const userRole = getUserRole(currentUser);
  
  // Redirect to home if not authorized for this role
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }
  
  // Render children if authenticated and authorized
  return children;
};

export default RoleProtectedRoute; 