import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Input, Button, Container, Flex, Alert } from '@chakra-ui/react'; // import Alert

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // add error state

 const handleLogin = async (event) => {
  event.preventDefault();

  try {
    const response = await axios.post('https://connections-api.herokuapp.com/users/login', {
      email,
      password,
    });

    localStorage.setItem('userToken', response.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`; // Set token in axios headers
    navigate('/contacts');
    localStorage.setItem('userEmail', email);
  } catch (error) {
  console.error("Login error: ", error);
  if (error.response && error.response.status === 400) {
    setError("Invalid email or password");
  }
}
};

return (
    <Container maxW="container.md" width="300px" margin="auto"> 
      <Box as="form" onSubmit={handleLogin}>
        {error && <Alert status="error">{error}</Alert>} {/* Display error message */}
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