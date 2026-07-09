import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api, { setAuthToken } from '../api/axios';

const AuthContext = createContext(null);

const getStoredAuth = () => {
  if (typeof window === 'undefined') {
    return { token: null, user: null };
  }

  try {
    const token = window.localStorage.getItem('wf-auth-token');
    const user = window.localStorage.getItem('wf-auth-user');

    return {
      token,
      user: user ? JSON.parse(user) : null,
    };
  } catch {
    return { token: null, user: null };
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredAuth().user);
  const [token, setToken] = useState(() => getStoredAuth().token);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const storedAuth = getStoredAuth();

      if (!storedAuth.token) {
        setLoading(false);
        return;
      }

      try {
        setAuthToken(storedAuth.token);
        const response = await api.get('/api/auth/me');

        setUser(response.data.user);
        setToken(storedAuth.token);
        window.localStorage.setItem('wf-auth-user', JSON.stringify(response.data.user));
      } catch {
        setUser(null);
        setToken(null);
        window.localStorage.removeItem('wf-auth-token');
        window.localStorage.removeItem('wf-auth-user');
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/api/auth/login', {
      email,
      password,
    });

    const nextUser = response.data.user;
    const nextToken = response.data.token;

    setAuthToken(nextToken);
    setUser(nextUser);
    setToken(nextToken);
    window.localStorage.setItem('wf-auth-token', nextToken);
    window.localStorage.setItem('wf-auth-user', JSON.stringify(nextUser));

    return response.data;
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    setToken(null);
    window.localStorage.removeItem('wf-auth-token');
    window.localStorage.removeItem('wf-auth-user');
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      isAdmin: user?.role === 'admin',
      login,
      logout,
    }),
    [loading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}