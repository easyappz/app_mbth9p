import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getTokens as getStoredTokens, setTokens as persistTokens, clearTokens as purgeTokens } from '../api/axios';
import { loginRequest, meRequest, registerRequest } from '../api/auth';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tokens, setTokensState] = useState(() => getStoredTokens());
  const [loading, setLoading] = useState(true);

  const syncTokensFromStorage = useCallback(() => {
    setTokensState(getStoredTokens());
  }, []);

  const updateTokens = useCallback((next) => {
    if (next && (typeof next.access === 'string' || typeof next.refresh === 'string')) {
      persistTokens(next);
    } else {
      purgeTokens();
    }
    syncTokensFromStorage();
  }, [syncTokensFromStorage]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const data = await loginRequest(email, password);
      const access = data?.access;
      const refresh = data?.refresh;
      if (!access || !refresh) {
        throw new Error('Invalid token response');
      }
      updateTokens({ access, refresh });
      const me = await meRequest();
      setUser(me);
      return me;
    } catch (err) {
      purgeTokens();
      syncTokensFromStorage();
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [syncTokensFromStorage, updateTokens]);

  const logout = useCallback(() => {
    purgeTokens();
    syncTokensFromStorage();
    setUser(null);
  }, [syncTokensFromStorage]);

  const registerAndLogin = useCallback(async (payload) => {
    await registerRequest(payload);
    await login(payload.email, payload.password);
  }, [login]);

  useEffect(() => {
    let active = true;
    async function init() {
      try {
        const t = getStoredTokens();
        if (t?.access) {
          const me = await meRequest();
          if (active) {
            setUser(me);
          }
        } else if (active) {
          setUser(null);
        }
      } catch (_) {
        purgeTokens();
        if (active) {
          syncTokensFromStorage();
          setUser(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    init();
    return () => {
      active = false;
    };
  }, [syncTokensFromStorage]);

  useEffect(() => {
    function onStorage(e) {
      if (e && (e.key === 'accessToken' || e.key === 'refreshToken')) {
        syncTokensFromStorage();
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [syncTokensFromStorage]);

  const value = useMemo(() => ({
    user,
    loading,
    tokens,
    login,
    logout,
    registerAndLogin,
    setUser,
  }), [user, loading, tokens, login, logout, registerAndLogin]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
