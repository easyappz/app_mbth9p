import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

function Login() {
  return (
    <div data-easytag="id1-src/pages/Login.jsx">
      <Card>
        <Title level={3}>Вход</Title>
        <Paragraph>Форма входа будет добавлена на следующем шаге.</Paragraph>
      </Card>
    </div>
  );
}

export default Login;
