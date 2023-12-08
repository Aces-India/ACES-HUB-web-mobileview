// src/components/Login.js
import React, { useState } from 'react';
// import StudentPage from './student';
import StudentPage from './Student';
import LecturerPage from './Admin'; 
import '../index.css';
import companyLogo from '../assets/b.png';
const Login = () => {
  const [role, setRole] = useState('student'); 

  return (
    <div className="main-login">
    <div className="loginContainer">
    <div className="logoContainer">
      <img src={companyLogo} alt="Logo" className="logo" />
     </div>
      <div className="login-label">
        <h2 style={{ marginRight: '90px',color:'#fff' }}>Login</h2>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="lecturer">Lecturer</option>
        </select>
      </div>

      {role === 'student' && (
        <>
          {/* Additional student-specific login fields if needed */}
          <StudentPage />
        </>
      )}

      {role === 'lecturer' && (
        <>
          {/* Additional lecturer-specific login fields if needed */}
          <LecturerPage />
        </>
      )}

    
    </div>
    </div>
  );
};

export default Login;
