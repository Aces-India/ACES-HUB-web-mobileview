import React from 'react';
import companyLogo from '../assets/b.png';
import { NavLink } from 'react-router-dom';
import '../index.css';

const Header = () => {
  return (
    <div className="header-container">
      <div className="logo-container">
        <img src={companyLogo} alt="Company Logo" className="company-logo" />
        <nav>
        <NavLink to="/Home" className="nav-link" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/blogs" className="nav-link" activeClassName="active">
          Blog
        </NavLink>
      </nav>
      </div>
      
    </div>
  );
};

export default Header;
