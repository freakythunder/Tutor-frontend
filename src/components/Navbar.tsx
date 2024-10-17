import React from 'react';
import styles from '../Styles/Navbar.module.css';

const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <h1 className={styles.title}>Personal Coding Tutor</h1>
        </nav>
    );
}

export default Navbar;
