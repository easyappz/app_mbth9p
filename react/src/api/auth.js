import instance from './axios';

// Auth API wrappers according to openapi.yml
// POST /api/auth/token
export async function loginRequest(email, password) {
  const res = await instance.post('/auth/token', {
    username: email,
    password,
  });
  return res.data;
}

// POST /api/auth/token/refresh (not used directly here but exported for completeness)
export async function refreshRequest(refresh) {
  const res = await instance.post('/auth/token/refresh', { refresh });
  return res.data;
}

// GET /api/auth/me
export async function meRequest() {
  const res = await instance.get('/auth/me');
  return res.data;
}

// POST /api/auth/register
export async function registerRequest(payload) {
  const res = await instance.post('/auth/register', payload);
  return res.data;
}
