import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await axios.post('https://foodie-backend-0vyk.onrender.com/api/user/login', data);
      console.log(response.data);

      if (response.data.error) {
        setMessage(response.data.error);
        return;
      }

      setMessage(response.data.message || 'Login successful!');
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('email', response.data.user.email)
      setIsLoggedIn(true);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'Login failed.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <Title>Login</Title>
        {message && <Message>{message}</Message>}

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

        <SubmitBtn type="submit">Login</SubmitBtn>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;

// 🌙 Styled Components (Dark Theme + Gradient Button)
const LoginContainer = styled.div`
  background: linear-gradient(35deg, #494949, #313131);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginForm = styled.form`
  background-color: #2b2b2b;
  padding: 2rem;
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
