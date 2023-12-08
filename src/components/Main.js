import React, { useState, useContext } from "react";
// import Login from "./Home/login";
import Login from "./Admin/Home/login";
import Aceluzr from "../assets/Acealyze.png";
import { GlobalContext } from "../GlobalProvider";
import companyLogo from "../assets/b.png";
import StudentLogin from "./StudentLogin";

const Main = () => {
  const [role, setRole] = useState("student");

  const { form, setForm } = useContext(GlobalContext);
  return (
    <>
      <div className="main-login">
        <div className="loginContainer">
          <div className="logoContainer">
            <img src={companyLogo} alt="Logo" className="logo" />
          </div>
          <div className="login-label">
            <h2 style={{ marginRight: "90px", color: "#fff" }}>Login</h2>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="home-page">
            <div className="leftSide">
              <a
                href="https://www.aces-co.com/"
                rel="noreferrer"
                target="_blank"
              >
                {/* <img className="logo_logo" src={Aceluzr} alt="logo-img" /> */}
              </a>
              {role === "student" ? <StudentLogin /> : <Login />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
