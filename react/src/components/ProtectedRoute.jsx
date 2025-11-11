import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div data-easytag="id1-src/components/ProtectedRoute.jsx">
      {children}
    </div>
  );
}

export default ProtectedRoute;
