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
      <NavLink to="/register" isActive={location.pathname === "/register"} fontSize="lg">
        Register
      </NavLink>
      <Box width="10px" mt={4} />
      <NavLink to="/login" isActive={location.pathname === "/login"} fontSize="lg">
        Login
      </NavLink>
      <Box width="10px" my={4} />
      <NavLink to="/contacts" isActive={location.pathname === "/contacts"} fontSize="lg">
        Contacts
      </NavLink>
      {isAuthenticated && <UserMenu />}  
    </Box>
  );
};

export default Navigation;