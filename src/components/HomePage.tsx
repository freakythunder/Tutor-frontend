// src/components/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import styles from '../Styles/HomePage.module.css';
import { useAuth } from '../context/AuthContext';
import { useAuth0 } from "@auth0/auth0-react";

const HomePage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const authenticateUser = async () => {
      if (isAuthenticated && user) {
        setLoading(true);

        const username = user.email;
        const password = user.name; 

        try {
          const response = await api.post('/auth/login', { username, password });
          if (response.data?.data) {
            login(username, response.data.data.token);
            navigate('/main');
          } else {
            setErrorMessage('Invalid response from server');
          }
        } catch (error: any) {
          setErrorMessage(error.response?.data?.message || 'Failed to authenticate.');
        } finally {
          setLoading(false);
        }
      }
    };

    authenticateUser();
  }, [isAuthenticated, user, login, navigate]);

  const handleGoogleLogin = () => {
    setErrorMessage('');
    loginWithRedirect();
  };

  return (
    <main className={styles.homePage}>
      {loading ? (
        <div className={styles.loadingScreen} aria-live="polite">
          <p>Loading, please wait...</p>
        </div>
      ) : (
        <div className={styles.container}>
          <h1>Welcome to Personal Coding Tutor</h1>
          <form className={styles.authForm}>
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
            <button type="button" onClick={handleGoogleLogin}>
              Sign up or login with Google
            </button>
          </form>
        </div>
      )}
    </main>
  );
};

export default HomePage;
