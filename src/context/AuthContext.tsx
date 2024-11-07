// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  username: string | null;
  setUsername: (username: string | null) => void;
  isAuthenticated: boolean;
  login: (username: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for existing auth on mount
    const storedUsername = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (storedUsername && token) {
      setUsername(storedUsername);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username: string, token: string) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    setUsername(username);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setUsername(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ username, setUsername, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};