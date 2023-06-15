import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Text, Flex, Center } from '@chakra-ui/react';

const UserMenu = () => {
  const userEmail = localStorage.getItem('userEmail'); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');  
    navigate('/login');
  };

  return (
    <Center>
      <Flex direction="column">
        <Text my={4} fontSize="xl">{userEmail}</Text> 
        <Button mb={10} colorScheme="blue" onClick={handleLogout}>Logout</Button>
      </Flex>
    </Center>
  );
};

export default UserMenu;