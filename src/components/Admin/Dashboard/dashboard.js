import React, { useState } from "react";
import Notification from "./notification";
import UsersData from "./userData";
import logo from "../../../assets/logo.png";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import Modal from "react-modal";
const Dashboard = () => {
  let navigate = useNavigate();
  const menuItem = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/dashboard",
      name: "Dashboard",
    },
    // {
    //   path: "/notification",
    //   name: "Notification",
    // },
  ];

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/");
  };
  return (
    <>
      <div className="MainDashboard">
        <div className="sideBar">
          <img
            src={logo}
            width={180}
            height={40}
            className="logo"
            alt="Aceslogo"
          />
          <div className="sidebarlinks">
            {menuItem.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className="link"
                activeclassName="active"
              >
                <div className="icon">{item.icon}</div>
                <div className="link_text">{item.name}</div>
              </NavLink>
            ))}
          </div>
          <button
            className="link"
            activeclassName="active"
            style={{
              width: "185px",
              cursor: "pointer",
              color: "white",
              transition: "all 0.1s",
              background: "#213966",
              marginTop: "57vh",
              marginLeft: "5px",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="dashboardContent">
          <div>
            <UsersData />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
