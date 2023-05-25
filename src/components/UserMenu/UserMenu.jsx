import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserMenu.module.css';  // You will need to create this CSS module

const UserMenu = () => {
  const userEmail = localStorage.getItem('userEmail'); // Assuming userEmail is stored in local storage
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');  // Clear email on logout too
    navigate('/login');
  };

  return (
    <div className={styles.userMenu}>
      <p className={styles.userEmail}>{userEmail}</p>
      <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;