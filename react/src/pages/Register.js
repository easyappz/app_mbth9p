import React, { useCallback } from 'react';
import { Button, Card, DatePicker, Form, Input, Typography, message } from 'antd';
import dayjs from 'dayjs';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { registerAndLogin } = useAuth();

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
    const payload = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone: values.phone || '',
      date_of_birth: values.date_of_birth ? dayjs(values.date_of_birth).format('YYYY-MM-DD') : null,
      bio: values.bio || '',
      password: values.password,
      password2: values.password2,
    };

    try {
      await registerAndLogin(payload);
      message.success('Регистрация успешна');
      navigate('/profile');
    } catch (err) {
      message.error('Ошибка регистрации: ' + getErrorMessage(err));
    }
  }, [navigate, registerAndLogin, getErrorMessage]);

  return (
    <div data-easytag="id5-src/pages/Register.js" style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ maxWidth: 720, width: '100%' }}>
        <Typography.Title level={3} style={{ marginBottom: 16 }}>Регистрация</Typography.Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Имя" name="first_name" rules={[{ required: true, message: 'Введите имя' }]}>
            <Input placeholder="Имя" autoComplete="given-name" />
          </Form.Item>

          <Form.Item label="Фамилия" name="last_name" rules={[{ required: true, message: 'Введите фамилию' }]}>
            <Input placeholder="Фамилия" autoComplete="family-name" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Введите Email' }, { type: 'email', message: 'Некорректный Email' }]}>
            <Input placeholder="Email" autoComplete="email" />
          </Form.Item>

          <Form.Item label="Телефон" name="phone">
            <Input placeholder="Телефон" autoComplete="tel" />
          </Form.Item>

          <Form.Item label="Дата рождения" name="date_of_birth">
            <DatePicker style={{ width: '100%' }} placeholder="Дата рождения" format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item label="О себе" name="bio">
            <Input.TextArea placeholder="О себе" rows={4} />
          </Form.Item>

          <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
            <Input.Password placeholder="Пароль" autoComplete="new-password" />
          </Form.Item>

          <Form.Item label="Повторите пароль" name="password2" dependencies={["password"]} rules={[
            { required: true, message: 'Повторите пароль' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const pass = getFieldValue('password');
                if (!value || value === pass) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}>
            <Input.Password placeholder="Повторите пароль" autoComplete="new-password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Регистрация
            </Button>
          </Form.Item>
        </Form>
        <Typography.Paragraph style={{ marginTop: 8 }}>
          Уже есть аккаунт? <Link to="/login">Вход</Link>
        </Typography.Paragraph>
      </Card>
    </div>
  );
}

export default Register;
