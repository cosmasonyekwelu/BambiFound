import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, setAccessToken } from '../lib/api';

export interface User {
  id: string;
  email: string;
  fullName: string | null;
  emailVerified: boolean;
  onboardingCompleted: boolean;
  onboardingSkipped: boolean;
  onboardingStep: number;
  onboardingData: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: { email: string; password: string; fullName?: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updatedFields: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initAuth = async () => {
    try {
      const res = await api.post('/auth/refresh');
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);
    } catch {
      setAccessToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    const res = await api.post('/auth/login', data);
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
  };

  const register = async (data: { email: string; password: string; fullName?: string }) => {
    const res = await api.post('/auth/register', data);
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore errors on logout
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  const updateUser = (updatedFields: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedFields } : null));
  };

  const refreshUser = async () => {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data);
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
