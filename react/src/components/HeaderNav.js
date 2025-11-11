import React, { useCallback } from 'react';
import { Button, Layout, Space, Typography, message } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function HeaderNav() {
  const { tokens, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = useCallback(() => {
    logout();
    message.success('Вы вышли из аккаунта');
    if (location.pathname === '/profile') {
      navigate('/');
    }
  }, [location.pathname, logout, navigate]);

  const isAuthed = Boolean(tokens?.access);

  return (
    <Layout.Header data-easytag="id7-src/components/HeaderNav.js" style={{ background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography.Title level={4} style={{ margin: 0 }}>Главная</Typography.Title>
        </Link>
        <Space>
          {!isAuthed && (
            <>
              <Link to="/login">
                <Button type="primary">Вход</Button>
              </Link>
              <Link to="/register">
                <Button>Регистрация</Button>
              </Link>
            </>
          )}
          {isAuthed && (
            <>
              <Link to="/profile">
                <Button>Профиль</Button>
              </Link>
              <Button danger onClick={onLogout}>Выйти</Button>
            </>
          )}
        </Space>
      </div>
    </Layout.Header>
  );
}

export default HeaderNav;
