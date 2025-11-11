import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

function Landing() {
  return (
    <div data-easytag="id1-src/pages/Landing.jsx">
      <Typography>
        <Title level={2}>Добро пожаловать</Title>
        <Paragraph>
          Главная страница. Авторизуйтесь или зарегистрируйтесь, чтобы продолжить.
        </Paragraph>
      </Typography>
    </div>
  );
}

export default Landing;
