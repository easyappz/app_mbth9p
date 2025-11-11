import React from 'react';
import { Button, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div data-easytag="id3-src/pages/Landing.js" style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ maxWidth: 560, width: '100%' }}>
        <Typography.Title level={2} style={{ marginBottom: 8 }}>
          Добро пожаловать
        </Typography.Title>
        <Typography.Paragraph style={{ marginBottom: 16 }}>
          Это демо-приложение с регистрацией и авторизацией. Пожалуйста, войдите или создайте аккаунт.
        </Typography.Paragraph>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/login">
            <Button type="primary">Вход</Button>
          </Link>
          <Link to="/register">
            <Button>Регистрация</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Landing;
