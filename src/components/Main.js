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
        <div className="login-roleSelector">
          <label>
            <input
              type="radio"
              value="student"
              checked={role === 'student'}
              onChange={() => setRole('student')}
              
            />
            Student
          </label>

          <label>
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
            />
            Admin
          </label>
        </div>
      </div>
      {role === "student" ? <StudentLogin /> : <Login />}
    </div>
  </div>
</>
);
};

export default Main;
