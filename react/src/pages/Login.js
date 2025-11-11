import React, { useCallback } from 'react';
import { Button, Card, Form, Input, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const getErrorMessage = useCallback((err) => {
    const data = err?.response?.data;
    if (data && typeof data === 'object') {
      if (data.detail && typeof data.detail === 'string') return data.detail;
      if (data.error && typeof data.error === 'string') return data.error;
      const firstKey = Object.keys(data)[0];
      if (firstKey) {
        const val = Array.isArray(data[firstKey]) ? data[firstKey][0] : data[firstKey];
        if (typeof val === 'string') return val;
      }
    }
    return err?.message || 'Неизвестная ошибка';
  }, []);

  const onFinish = useCallback(async (values) => {
    try {
      await login(values.email, values.password);
      message.success('Успешный вход');
      navigate('/profile');
    } catch (err) {
      message.error('Ошибка входа: ' + getErrorMessage(err));
    }
  }, [getErrorMessage, login, navigate]);

  return (
    <div data-easytag="id4-src/pages/Login.js" style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ maxWidth: 520, width: '100%' }}>
        <Typography.Title level={3} style={{ marginBottom: 16 }}>Вход</Typography.Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Введите Email' }, { type: 'email', message: 'Некорректный Email' }]}
          >
            <Input placeholder="Email" autoComplete="email" />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password placeholder="Пароль" autoComplete="current-password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Вход
            </Button>
          </Form.Item>
        </Form>
        <Typography.Paragraph style={{ marginTop: 8 }}>
          Нет аккаунта? <Link to="/register">Регистрация</Link>
        </Typography.Paragraph>
      </Card>
    </div>
  );
}

export default Login;
