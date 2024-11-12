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
        setLoading(true); // Show loading screen

        const username = user.email;
        const password = user.name; // Adjust this if necessary
        const endpoint = '/auth/login';

        try {
          const response = await api.post(endpoint, { 
            username, 
            password 
          });

          console.log('Auth response:', response.data.data); // Debug log

          if (response.data && response.data.data) {
            login(username, response.data.data.token);
            navigate('/main');
          } else {
            setErrorMessage('Invalid response from server');
            console.error('Invalid response structure:', response.data);
          }
        } catch (error: any) {
          const errorMsg = error.response?.data?.message || 
                          error.message || 
                          'Failed to authenticate. Please try again.';
          setErrorMessage(errorMsg);
          console.error('Authentication error:', error);
        } finally {
          setLoading(false); // Hide loading screen when done
        }
      }
    };

    authenticateUser();
  }, [isAuthenticated, user, login, navigate]);

  const handleGoogleLogin = () => {
    setErrorMessage('');
    loginWithRedirect(); // Initiates Google login
  };

  return (
    <div className={styles.homePage}>
      {loading ? (
        <div className={styles.loadingScreen}>
          <p>Loading, please wait...</p>
        </div>
      ) : (
        <div className={styles.container}>
          <h1>Welcome to Personal Coding Tutor</h1>
          <form className={styles.authForm}>
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
            <button type="button" onClick={handleGoogleLogin}>Sign up or login with Google</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default HomePage;
