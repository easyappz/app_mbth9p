import React, { useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

import HeaderNav from './components/HeaderNav';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './auth/AuthContext';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function AppShell() {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.handleRoutes === 'function') {
      window.handleRoutes(['/', '/login', '/register', '/profile']);
    }
  }, []);

  return (
    <Layout className="app-layout" data-easytag="id1-src/App.js">
      <HeaderNav />
      <Layout.Content className="content-container" data-easytag="id2-src/App.js">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={(
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            )}
          />
        </Routes>
      </Layout.Content>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <AppShell />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
