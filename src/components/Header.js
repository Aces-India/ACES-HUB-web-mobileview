
import React from 'react';
import companyLogo from '../assets/b.png'; 
import '../index.css';

const Header = () => {
  return (
    <div className="header-container">
      <img src={companyLogo} alt="Company Logo" className="company-logo" />
      {/* Add other header content here */}
    </div>
  );
};

export default Header;
