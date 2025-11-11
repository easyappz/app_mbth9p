import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function Login() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      const payload = { username: values.email, email: values.email, password: values.password };
      await auth.login(payload);
      navigate('/profile');
    } catch (err) {
      const errMsg = err?.response?.data?.detail || err?.message || 'Не удалось войти. Проверьте данные и попробуйте снова.';
      message.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }} data-easytag="id1-src/pages/Login.jsx">
      <Card title="Вход" style={{ width: 420 }}>
        <Form layout="vertical" onFinish={onFinish} autoComplete="off" data-easytag="id2-src/pages/Login.jsx">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Введите email' }, { type: 'email', message: 'Введите корректный email' }]}
          >
            <Input placeholder="name@example.com" data-easytag="id3-src/pages/Login.jsx" />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password placeholder="Введите пароль" data-easytag="id4-src/pages/Login.jsx" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting} block data-easytag="id5-src/pages/Login.jsx">
              Войти
            </Button>
          </Form.Item>

          <Typography.Paragraph style={{ marginBottom: 0 }}>
            Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
          </Typography.Paragraph>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
