import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Register = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = { username, email, password };

    try {
      const response = await axios.post('https://foodie-backend-0vyk.onrender.com/api/user/register', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      setMessage(response.data.message);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('email', response.data.user.email);

      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleRegister}>
        <Title>Register</Title>
        {message && <Message>{message}</Message>}

        <InputGroup>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </InputGroup>

        <InputGroup>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputGroup>

        <InputGroup>
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <ToggleBtn type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide Password' : 'Show Password'}
          </ToggleBtn>
        </InputGroup>

        <SubmitBtn type="submit">Register</SubmitBtn>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;

// 🌙 Styled Components (Dark/Gradient UI)
const RegisterContainer = styled.div`
  background: linear-gradient(35deg, #494949, #313131);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterForm = styled.form`
  background-color: #2b2b2b;
  padding: 2.5rem;
  border-radius: 1.5rem;
  width: 90%;
  max-width: 450px;
  color: #fff;
  box-shadow: 0 8px 16px rgba(0,0,0,0.5);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #fff;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

  label {
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  input {
    padding: 0.9rem;
    border-radius: 0.8rem;
    border: none;
    background-color: #3c3c3c;
    color: #fff;
    font-size: 1rem;

    &:focus {
      outline: none;
      background-color: #505050;
    }
  }
`;

const ToggleBtn = styled.button`
  margin-top: 0.7rem;
  background: none;
  border: none;
  color: #ff7e5f;
  cursor: pointer;
  font-size: 0.9rem;
  align-self: flex-start;

  &:hover {
    text-decoration: underline;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 2rem;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Message = styled.p`
  color: #ff6961;
  text-align: center;
  font-weight: 600;
  margin-bottom: 1.2rem;
`;
