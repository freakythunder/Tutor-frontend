// src/components/HomePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import styles from '../Styles/HomePage.module.css';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    setErrorMessage('');

    const endpoint = isLogin ? '/auth/login' : '/auth/register';

    try {
      const response = await api.post(endpoint, { 
        username, 
        password 
      });
      
      console.log('Auth response:', response.data.data); // Debug log

      if (response.data && response.data.data) {
        // Update this based on your actual API response structure
        login(username, response.data.data.token);
        navigate('/main');
      } else {
        setErrorMessage('Invalid response from server');
        console.error('Invalid response structure:', response.data);
      }
    } catch (error: any) {
      // Better error handling
      const errorMsg = error.response?.data?.message || 
                      error.message || 
                      'Failed to authenticate. Please try again.';
      setErrorMessage(errorMsg);
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.container}>
        <h1>Welcome to Personal Coding Tutor</h1>
        <form onSubmit={handleAuth} className={styles.authForm}>
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          <button type="submit" className={styles.submitButton}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
          <button
            type="button"
            className={styles.switchButton}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Create an account' : 'Already have an account?'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;