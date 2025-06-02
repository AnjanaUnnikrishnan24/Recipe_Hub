import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  const location = useLocation();
  return (
    <nav >
      <div className='logo'>
        <Link to='/home'>TastyBites</Link>
      </div>
      <div className='links'>
        <Link to='/home'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/all'>All Recipes</Link>
        <Link to='/contact'>Contact us</Link>
      </div>
    </nav>
  );
}

export default Navbar;