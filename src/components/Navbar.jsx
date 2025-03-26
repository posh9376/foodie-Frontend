import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search"; // Import SearchBar component

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  let username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        RECIPE FINDER
      </Link>
      <div className="hamburger-menu" onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div
        className={`navbar-links ${
          isMobileMenuOpen ? "mobile-visible" : "mobile-hidden"
        }`}
      >
        <Link to="/" className="navbar-link">
          Home
        </Link>
        {!isLoggedIn && (
          <Link to="/register" className="navbar-link">
            Register
          </Link>
        )}
        {isLoggedIn ? (
          <>
            <button className="navbar-button" onClick={handleLogout}>
              Logout
            </button>
            <Link to="/addrecipes" className="navbar-link">
              Add Recipes
            </Link>
          </>
        ) : (
          <Link to="/login" className="navbar-link">
            Login
          </Link>
        )}
        <Link to="/" className="navbar-link">
          Info
        </Link>
      </div>

      <Search />

      <Link to="/account" className="navbar-user">
        Welcome {isLoggedIn ? username : "User"}
      </Link>
    </nav>
  );
};

export default Navbar;
