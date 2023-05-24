import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      await axios.post('https://connections-api.herokuapp.com/api/users', {
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
    <form onSubmit={handleRegister}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;