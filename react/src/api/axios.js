import axios from 'axios';

// Base URL resolution
const baseURL = process.env.REACT_APP_API_BASE_URL || '/api';

// LocalStorage keys
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// Token helpers
export function getTokens() {
  return {
    access: localStorage.getItem(ACCESS_TOKEN_KEY) || null,
    refresh: localStorage.getItem(REFRESH_TOKEN_KEY) || null,
  };
}

export function setTokens(tokens) {
  const { access, refresh } = tokens || {};
  if (typeof access === 'string') {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
  }
  if (typeof refresh === 'string') {
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  }
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// Axios instance (singleton)
export const instance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach Authorization header when access token is present
instance.interceptors.request.use(
  (config) => {
    const { access } = getTokens();
    if (access) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${access}`;
    } else if (config.headers && config.headers.Authorization) {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh token flow control
let refreshPromise = null;

function isAuthUrl(url) {
  if (!url) return false;
  // Normalize url without query params
  const clean = String(url).split('?')[0];
  return (
    clean === '/auth/token' ||
    clean === 'auth/token' ||
    clean === '/auth/token/refresh' ||
    clean === 'auth/token/refresh'
  );
}

async function refreshAccessToken() {
  if (refreshPromise) return refreshPromise;

  const { refresh } = getTokens();
  if (!refresh) {
    return Promise.reject(new Error('No refresh token'));
  }

  // Use a dedicated promise to avoid multiple parallel refresh requests
  refreshPromise = instance
    .post('/auth/token/refresh', { refresh }, { __isRefreshRequest: true })
    .then((res) => {
      const newAccess = res?.data?.access;
      if (!newAccess) throw new Error('No access token in refresh response');
      setTokens({ access: newAccess });
      return newAccess;
    })
    .catch((err) => {
      clearTokens();
      throw err;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

// Response interceptor: try to refresh token on 401, then retry once
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const originalConfig = error?.config || {};

    // If 401 and we have a refresh token, try to refresh once
    if (
      status === 401 &&
      !originalConfig.__isRefreshRequest &&
      !originalConfig._retry &&
      !isAuthUrl(originalConfig.url) &&
      getTokens().refresh
    ) {
      try {
        const newAccess = await refreshAccessToken();
        originalConfig._retry = true;
        originalConfig.headers = originalConfig.headers || {};
        originalConfig.headers.Authorization = `Bearer ${newAccess}`;
        return instance(originalConfig);
      } catch (refreshErr) {
        // Fall-through to global error handling after clearing tokens
      }
    }

    // Global error logging and forwarding to parent
    try {
      const errorData = {
        type: 'fetchError',
        url: error?.config?.url,
        request: {
          headers: error?.config?.headers,
          data: error?.config?.data,
        },
        response: {
          status: error?.response?.status,
          data: error?.response?.data,
          headers: error?.response?.headers,
          message: error?.message,
        },
        pathname: typeof window !== 'undefined' ? window.location?.pathname : undefined,
      };
      // eslint-disable-next-line no-console
      console.error('Global API error:', errorData);
      if (typeof window !== 'undefined' && window.parent) {
        window.parent.postMessage(errorData, '*');
      }
    } catch (_) {
      // Silent
    }

    return Promise.reject(error);
  }
);

export default instance;
