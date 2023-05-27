import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Input, Button, Container, Flex } from '@chakra-ui/react'; // import Container

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://connections-api.herokuapp.com/users/login', {
        email,
        password,
      });

      localStorage.setItem('userToken', response.data.token);
      navigate('/contacts');
      localStorage.setItem('userEmail', email);
    } catch (error) {
      // Handle login errors here...
    }
  };

return (
    <Container maxW="container.md" width="300px" margin="auto"> 
      <Box as="form" onSubmit={handleLogin}>
        <Input maxW="400px" type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input maxW="400px" type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required mt={4} />
        <Flex alignItems="center" justifyContent="center" mt={4}> 
          <Button colorScheme="teal" type="submit">Login</Button>
        </Flex>
      </Box>
    </Container>
  );
}

export default Login;