import instance from './axios';

export async function loginRequest(email, password) {
  const res = await instance.post('/auth/token', { username: email, password });
  return res.data;
}

export async function refreshRequest(refresh) {
  const res = await instance.post('/auth/token/refresh', { refresh });
  return res.data;
}

export async function registerRequest(payload) {
  // Expecting already formatted date_of_birth (YYYY-MM-DD) or null/undefined
  const res = await instance.post('/auth/register', payload);
  return res.data;
}

export async function meRequest() {
  const res = await instance.get('/auth/me');
  return res.data;
}
