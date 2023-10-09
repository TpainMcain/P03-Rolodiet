import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';

// This component represents the main navigation bar for the application.
const NavigationBar = () => {
  return (
    // Navbar from 'react-bootstrap' is used to create a dark-themed navigation bar.
    <Navbar className="custom-navbar" bg="dark" variant="dark">
      
      {/* Brand section of the navigation bar that contains the logo and brand name. */}
      {/* It links to the home route and uses inline-flex to keep the image and text side-by-side. */}
      <Link className="navbar-brand" to="/home" style={{display:'inline-flex'}}>
        <img src="/logo.webp" alt="Good Eats logo" width="80px" height="80px" />
        <h2>Good Eats</h2>
      </Link>
      
      {/* Navigation links for the application. */}
      <Nav>
        <Link className="nav-link" to="/home">Home</Link>
        <Link className="nav-link" to="/features">Features</Link>
        <Link className="nav-link" to="/about">About</Link>
        
        {/* Login and Register links are styled differently (e.g., with different buttons). */}
        <Link className="nav-link login-button" to="/login">Login</Link>
        <Link className="nav-link register-button" to="/register">Register</Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
