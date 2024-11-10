// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  username: string | null;
  setUsername: (username: string | null) => void;
  isAuthenticated: boolean;
  login: (username: string, token: string, welcomeMsg?: string) => void;
  logout: () => void;
  welcomeMessage: string | null;
  clearWelcomeMessage: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);

  const login = (username: string, token: string) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    

    
    setUsername(username);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('welcomeMessage');
    setUsername(null);
    setWelcomeMessage(null);
    setIsAuthenticated(false);
  };

  const clearWelcomeMessage = () => {
    localStorage.removeItem('welcomeMessage');
    setWelcomeMessage(null);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const storedWelcomeMessage = localStorage.getItem('welcomeMessage');
    
    if (storedUsername && token) {
      setUsername(storedUsername);
      setWelcomeMessage(storedWelcomeMessage);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      username, 
      setUsername, 
      isAuthenticated, 
      login, 
      logout,
      welcomeMessage,
      clearWelcomeMessage 
    }}>
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