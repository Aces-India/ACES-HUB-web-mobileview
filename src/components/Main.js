import React, { useState, useContext } from "react";
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
          <div className="topSection">
            <div className="logoContainer">
              <img src={companyLogo} alt="Logo" className="logo" />
            </div>
            <div className="roleSelector">
             
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
          {role === "student" ? <StudentLogin /> : <Login />}
        </div>
      </div>
    </>
  );
};

export default Main;
