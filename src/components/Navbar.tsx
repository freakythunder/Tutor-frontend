// src/components/Navbar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Navbar.module.css';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { username, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
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
                <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
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