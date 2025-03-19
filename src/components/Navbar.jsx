import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  let username = localStorage.getItem('username');
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Nav>
      <Logo to="/">RECIPE FINDER</Logo>
      <HamburgerMenu onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </HamburgerMenu>
      <NavLinks isMobileMenuOpen={isMobileMenuOpen}>
        <StyledLink to="/">Home</StyledLink>
        {!isLoggedIn && <StyledLink to="/register">Register</StyledLink>}
        {isLoggedIn ? (
          <>
            <StyledButton onClick={handleLogout}>Logout</StyledButton>
            <StyledLink to="/addrecipes">Add Recipes</StyledLink>
          </>
        ) : (
          <StyledLink to="/login">Login</StyledLink>
        )}
      </NavLinks>
      <UserIcon to="/account">
        Welcome {isLoggedIn ? username : 'User'}
      </UserIcon>
    </Nav>
  );
};

export default Navbar;

// Styled Components - Gradient + Shadow + Hover
const Nav = styled.nav`
  background: linear-gradient(35deg, #494949, #313131);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 8px 16px rgba(0,0,0,0.5);
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled(Link)`
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 2px;
    width: 25px;
    background: #fff;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 1.5rem;
    right: 2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: ${({ isMobileMenuOpen }) => (isMobileMenuOpen ? 'flex' : 'none')};
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: linear-gradient(to right, #f27121, #e94057);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const StyledButton = styled.button`
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: linear-gradient(to right, #f27121, #e94057);
    transform: scale(1.05);
    border: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const UserIcon = styled(Link)`
  color: #fff;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1rem;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: linear-gradient(to right, #f27121, #e94057);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    margin-top: 1rem;
    width: 100%;
    text-align: center;
  }
`;