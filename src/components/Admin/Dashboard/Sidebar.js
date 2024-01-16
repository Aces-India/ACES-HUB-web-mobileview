// Sidebar.js
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png"; // Adjust path as necessary
import '../../../index.css';
const Sidebar = () => {
    let navigate = useNavigate();

    const menuItem = [
        {
          path: "/",
          name: "Home",
        },
        {
          path: "/dashboard",
          name: "Dashboard",
        },{
          path: "/eventlist",
          name: "Event List (Form update)",
        },
        {
          path: "/create-event",
          name: "Create Event",
          // icon: <CreateIcon />, // icon for Create Event
        },
        {
          path: "/display-events",
          name: "Display Events",
          // icon: <EventIcon />, // icon for Display Events
        },
      ];

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        navigate("/");
    };

    return (
        <div className="sideBar">
            <img src={logo} width={180} height={40} alt="Aceslogo" />
            <div className="sidebarlinks">
                {menuItem.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className="link"
                        activeClassName="Active"
                    >
                        <div className="icon">{item.icon}</div>
                        <div className="link_text">{item.name}</div>
                    </NavLink>
                ))}
            </div>
            <button
                onClick={handleLogout}
                className="link"
                style={{
                    width: "185px",
                    cursor: "pointer",
                    color: "white",
                    transition: "all 0.1s",
                    background: "#213966",
                    
                    marginLeft: "5px",
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
