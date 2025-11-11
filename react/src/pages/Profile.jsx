import React from 'react';
import { Card, Descriptions, Typography } from 'antd';

const { Title } = Typography;

function Profile() {
  return (
    <div data-easytag="id1-src/pages/Profile.jsx">
      <Card>
        <Title level={3} style={{ marginBottom: 16 }}>Профиль</Title>
        <Descriptions bordered column={1} size="middle">
          <Descriptions.Item label="Имя и фамилия">—</Descriptions.Item>
          <Descriptions.Item label="Email">—</Descriptions.Item>
          <Descriptions.Item label="Телефон">—</Descriptions.Item>
          <Descriptions.Item label="Дата рождения">—</Descriptions.Item>
          <Descriptions.Item label="О себе / биография">—</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}

export default Profile;
