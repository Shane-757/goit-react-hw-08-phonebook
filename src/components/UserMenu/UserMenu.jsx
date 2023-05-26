import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Text } from '@chakra-ui/react';

const UserMenu = () => {
  const userEmail = localStorage.getItem('userEmail'); // Assuming userEmail is stored in local storage
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');  // Clear email on logout too
    navigate('/login');
  };

  return (
    <div>
      <Text>{userEmail}</Text>
      <Button colorScheme="blue" onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default UserMenu;