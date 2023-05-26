import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Input, Button } from '@chakra-ui/react';

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
    <Box as="form" onSubmit={handleLogin}>
      <Input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <Input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <Button type="submit">Login</Button>
    </Box>
  );
}

export default Login;