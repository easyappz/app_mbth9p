import React from 'react';
import { Card, Descriptions, Spin } from 'antd';
import dayjs from 'dayjs';
import { useAuth } from '../auth/AuthContext';

function Profile() {
  const { user, loading } = useAuth();

  const renderDate = (date) => {
    if (!date) return '—';
    const d = dayjs(date);
    return d.isValid() ? d.format('YYYY-MM-DD') : String(date);
    };

  if (loading || !user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }} data-easytag="id1-src/pages/Profile.jsx">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }} data-easytag="id2-src/pages/Profile.jsx">
      <Card title="Профиль" style={{ width: 720 }}>
        <Descriptions column={1} bordered size="middle">
          <Descriptions.Item label="Имя">{user.first_name || '—'}</Descriptions.Item>
          <Descriptions.Item label="Фамилия">{user.last_name || '—'}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email || '—'}</Descriptions.Item>
          <Descriptions.Item label="Телефон">{user.phone || '—'}</Descriptions.Item>
          <Descriptions.Item label="Дата рождения">{renderDate(user.date_of_birth)}</Descriptions.Item>
          <Descriptions.Item label="О себе">{user.bio || '—'}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}

export default Profile;
