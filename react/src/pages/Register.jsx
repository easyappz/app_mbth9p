import React, { useState } from 'react';
import { Card, Form, Input, Button, DatePicker, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useAuth } from '../auth/AuthContext';

function Register() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      const payload = {
        first_name: values.first_name || '',
        last_name: values.last_name || '',
        email: values.email,
        phone: values.phone || '',
        date_of_birth: values.date_of_birth ? dayjs(values.date_of_birth).format('YYYY-MM-DD') : null,
        bio: values.bio || '',
        password: values.password,
        password2: values.password2,
      };
      await auth.registerAndLogin(payload);
      navigate('/profile');
    } catch (err) {
      const errMsg = err?.response?.data?.detail || err?.message || 'Не удалось зарегистрироваться. Попробуйте позже.';
      message.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }} data-easytag="id1-src/pages/Register.jsx">
      <Card title="Регистрация" style={{ width: 640 }}>
        <Form layout="vertical" onFinish={onFinish} autoComplete="off" data-easytag="id2-src/pages/Register.jsx">
          <Form.Item label="Имя" name="first_name">
            <Input placeholder="Иван" data-easytag="id3-src/pages/Register.jsx" />
          </Form.Item>

          <Form.Item label="Фамилия" name="last_name">
            <Input placeholder="Иванов" data-easytag="id4-src/pages/Register.jsx" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Введите email' }, { type: 'email', message: 'Введите корректный email' }]}
          >
            <Input placeholder="name@example.com" data-easytag="id5-src/pages/Register.jsx" />
          </Form.Item>

          <Form.Item label="Телефон" name="phone">
            <Input placeholder="+7 900 000-00-00" data-easytag="id6-src/pages/Register.jsx" />
          </Form.Item>

          <Form.Item label="Дата рождения" name="date_of_birth">
            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" placeholder="Выберите дату" data-easytag="id7-src/pages/Register.jsx" />
          </Form.Item>

          <Form.Item label="О себе / Биография" name="bio">
            <Input.TextArea rows={4} placeholder="Расскажите о себе" data-easytag="id8-src/pages/Register.jsx" />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}
            hasFeedback
          >
            <Input.Password placeholder="Введите пароль" data-easytag="id9-src/pages/Register.jsx" />
          </Form.Item>

          <Form.Item
            label="Повторите пароль"
            name="password2"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: 'Повторите пароль' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Повторите пароль" data-easytag="id10-src/pages/Register.jsx" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting} block data-easytag="id11-src/pages/Register.jsx">
              Зарегистрироваться
            </Button>
          </Form.Item>

          <div>
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
