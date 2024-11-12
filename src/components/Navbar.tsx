// src/components/Navbar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Navbar.module.css';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { username, isAuthenticated,  localLogout } = useAuth(); // Corrected logout function name
  const { logout } = useAuth0();

  const handleLogout = async () => {
    try {
      console.log('Attempting to log out'); // Debug log to confirm function execution
  
      // Send logout request to backend
      const response = await api.post('/auth/logout');
      if(response){
        console.log('Logout response:', response); // Debug log for successful response
  
        // Call local logout method to clear local storage and state
        localLogout();
    
        // Close menu and navigate to home
        setIsMenuOpen(false);
        navigate('/');
      }
      else{
        handleLogout();
      }

    } catch (error) {
      console.error('Logout request failed:', error);
  
      if (error.response) {
        console.error('Server responded with:', error.response.status, error.response.data);
      } else {
        console.error('No response received from server or request setup failed');
      }
  
      // Perform local logout even if backend logout fails
      localLogout();
      navigate('/');
    }
  };
  

  const handleCombinedLogout = async () => {
    await handleLogout(); // Ensure backend logout is completed first
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.title}>Personal Coding Tutor</h1>
      <div className={styles.navLinks}>
        {isAuthenticated ? (
          <div className={styles.userMenu}>
            <button onClick={toggleMenu} className={styles.userButton}>
              👤
            </button>
            {isMenuOpen && (
              <div className={styles.dropdown}>
                <span className={styles.username}>{username}</span>
                <button onClick={handleCombinedLogout} className={styles.logoutButton}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => navigate('/')} className={styles.loginButton}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
