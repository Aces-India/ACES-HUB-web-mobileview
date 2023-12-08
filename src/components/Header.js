import React from "react";
import companyLogo from "../assets/b.png";
import "../index.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();
  return (
    <>
      <div className="header-container">
        <img src={companyLogo} alt="Company Logo" className="company-logo" />
        {/* Add other header content here */}
        <div className="buttonHeader">
          <button className="btn" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="btn" onClick={() => navigate("/Blogs")}>
            Blog
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
