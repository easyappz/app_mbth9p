import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Spin } from 'antd';

function ProtectedRoute({ children }) {
  const { tokens, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div data-easytag="id8-src/components/ProtectedRoute.js" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <Spin />
      </div>
    );
  }

  if (!tokens?.access) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
