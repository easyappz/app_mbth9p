import React from 'react';
import { Layout, Button, Space, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const { Header } = Layout;
const { Title } = Typography;

function HeaderNav() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    message.success('Вы вышли из аккаунта');
    navigate('/');
  };

  return (
    <Header
      data-easytag="id1-src/components/HeaderNav.jsx"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div aria-hidden style={{ width: 28, height: 28, background: '#1677ff', borderRadius: 6 }} />
        <Title level={4} style={{ margin: 0 }}>
          <Link to="/" style={{ color: 'inherit' }}>Мой сайт</Link>
        </Title>
      </div>

      <div style={{ marginLeft: 'auto' }}>
        {isAuthenticated ? (
          <Space size="middle">
            <Link to="/profile">
              <Button type="link" data-easytag="id2-src/components/HeaderNav.jsx">Профиль</Button>
            </Link>
            <Button onClick={handleLogout} data-easytag="id3-src/components/HeaderNav.jsx">Выйти</Button>
          </Space>
        ) : (
          <Space size="middle">
            <Link to="/login">
              <Button type="link" data-easytag="id4-src/components/HeaderNav.jsx">Войти</Button>
            </Link>
            <Link to="/register">
              <Button type="primary" data-easytag="id5-src/components/HeaderNav.jsx">Регистрация</Button>
            </Link>
          </Space>
        )}
      </div>
    </Header>
  );
}

export default HeaderNav;
