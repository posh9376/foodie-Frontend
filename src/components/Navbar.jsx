import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  let username = localStorage.getItem('username');
  const navigate = useNavigate(); // 🔹 Hook for redirecting users

  const handleLogout = () => {
    // Clear all user data from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('token'); // remove access token
    localStorage.clear(); 
    
    setIsLoggedIn(false); // 🔹 Update state to reflect logout

    navigate('/login'); // 🔹 Redirect user to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">RECIPE FINDER</Link>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">{isLoggedIn ? '' : 'Register'}</Link></li>
          {isLoggedIn ? (
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
          <li><Link to="/addrecipes">{isLoggedIn ? 'Add Recipes' : ''}</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        <Link to="/account" className="user-icon">
          <p>Welcome {isLoggedIn ? username : 'User'}</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
