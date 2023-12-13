import React from "react";
import companyLogo from "../assets/b.png";
import "../index.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("isLoggedIn");

    navigate("/");
  };
  return (
    <>
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
        <button
          className="link"
          activeclassName="active"
          style={{
            width: "90px",
            cursor: "pointer",
            backgroundColor: "#213966",
            justifyContent: "center",
            marginTop: "-5px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginLeft: "auto",
            marginRight: "15px",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Header;
