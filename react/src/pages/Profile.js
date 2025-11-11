import React from 'react';
import { Card, Descriptions, Skeleton, Typography } from 'antd';
import { useAuth } from '../auth/AuthContext';

function Profile() {
  const { user, loading } = useAuth();

  return (
    <div data-easytag="id6-src/pages/Profile.js" style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ maxWidth: 720, width: '100%' }}>
        <Typography.Title level={3} style={{ marginBottom: 16 }}>Профиль</Typography.Title>
        {loading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : (
          <Descriptions column={1} bordered size="middle">
            <Descriptions.Item label="Имя">{user?.first_name || '—'}</Descriptions.Item>
            <Descriptions.Item label="Фамилия">{user?.last_name || '—'}</Descriptions.Item>
            <Descriptions.Item label="Email">{user?.email || '—'}</Descriptions.Item>
            <Descriptions.Item label="Телефон">{user?.phone || '—'}</Descriptions.Item>
            <Descriptions.Item label="Дата рождения">{user?.date_of_birth || '—'}</Descriptions.Item>
            <Descriptions.Item label="О себе">{user?.bio || '—'}</Descriptions.Item>
          </Descriptions>
        )}
      </Card>
    </div>
  );
}

export default Profile;
