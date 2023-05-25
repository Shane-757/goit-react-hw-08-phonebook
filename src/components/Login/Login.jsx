import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

      // Store the user token somewhere (local storage, cookies, app state, etc.)
      localStorage.setItem('userToken', response.data.token);

      // After successful login, redirect user to the home page.
      navigate('/contacts');
    } catch (error) {
      // Handle login errors here...
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;