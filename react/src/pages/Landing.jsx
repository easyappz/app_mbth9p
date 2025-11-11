import React from 'react';
import { Typography, Button, Space, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: '70vh', padding: '24px' }}
      data-easytag="id1-src/pages/Landing.jsx"
    >
      <Col xs={24} sm={20} md={16} lg={12} xl={10} style={{ textAlign: 'center' }}>
        <Typography.Title level={1} style={{ marginBottom: 16 }}>Добро пожаловать</Typography.Title>
        <Typography.Paragraph style={{ fontSize: 16, marginBottom: 32 }}>
          Простой сервис с регистрацией, авторизацией и профилем пользователя.
        </Typography.Paragraph>
        <Space size="middle">
          <Link to="/login">
            <Button type="primary" size="large" data-easytag="id2-src/pages/Landing.jsx">Войти</Button>
          </Link>
          <Link to="/register">
            <Button size="large" data-easytag="id3-src/pages/Landing.jsx">Зарегистрироваться</Button>
          </Link>
        </Space>
      </Col>
    </Row>
  );
}

export default Landing;
