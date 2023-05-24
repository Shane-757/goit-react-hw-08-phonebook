
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => (
  <nav>
    <NavLink to="/register" className={styles.link} activeClassName={styles.activeLink}>
      Register
    </NavLink>
    <NavLink to="/login" className={styles.link} activeClassName={styles.activeLink}>
      Login
    </NavLink>
    <NavLink to="/contacts" className={styles.link} activeClassName={styles.activeLink}>
      Contacts
    </NavLink>
  </nav>
);

export default Navigation;