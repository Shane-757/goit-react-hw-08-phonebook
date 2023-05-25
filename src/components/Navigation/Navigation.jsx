
import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav>
      <NavLink to="/register" className={location.pathname === "/register" ? styles.activeLink : styles.link}>
        Register
      </NavLink>
      <NavLink to="/login" className={location.pathname === "/login" ? styles.activeLink : styles.link}>
        Login
      </NavLink>
      <NavLink to="/contacts" className={location.pathname === "/contacts" ? styles.activeLink : styles.link}>
        Contacts
      </NavLink>
    </nav>
  );
};

export default Navigation;