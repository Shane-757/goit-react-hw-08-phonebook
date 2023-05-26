import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      await axios.post('https://connections-api.herokuapp.com/users/signup', {
        name,
        email,
        password,
      });

      // After successful registration, redirect user to the login page.
      navigate('/login');
    } catch (error) {
      console.error("Registration error: ", error);
    }
  };

  return (
    <Box as="form" onSubmit={handleRegister} width="300px" margin="auto">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      </FormControl>

      <FormControl id="email" isRequired mt={4}>
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      </FormControl>

      <FormControl id="password" isRequired mt={4}>
        <FormLabel>Password</FormLabel>
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </FormControl>

      <Button mt={4} colorScheme="teal" type="submit">Register</Button>
    </Box>
  );
}

export default Register;