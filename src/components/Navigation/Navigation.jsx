import React from 'react';
import { useLocation } from 'react-router-dom';
import UserMenu from '../UserMenu/UserMenu';
import { Box } from '@chakra-ui/react';
import NavLink from '../NavLink/NavLink'; 

const Navigation = () => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('userToken');
  
  return (
    <Box as="nav">
      <NavLink to="/register" isActive={location.pathname === "/register"}>
        Register
      </NavLink>
      <NavLink to="/login" isActive={location.pathname === "/login"}>
        Login
      </NavLink>
      <NavLink to="/contacts" isActive={location.pathname === "/contacts"}>
        Contacts
      </NavLink>
      {isAuthenticated && <UserMenu />}  
    </Box>
  );
};

export default Navigation;