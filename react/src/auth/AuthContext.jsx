import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('accessToken');
    if (stored) {
      setToken(stored);
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem('accessToken', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
  };

  const value = useMemo(() => ({
    isAuthenticated: Boolean(token),
    token,
    login,
    logout,
  }), [token]);

  return (
    <AuthContext.Provider value={value}>
      <div data-easytag="id1-src/auth/AuthContext.jsx">{children}</div>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
