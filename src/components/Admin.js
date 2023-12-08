// src/components/Login.js
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here, such as API calls or authentication checks
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="formContainer">

    <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div className="form-group">
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <button className="loginButton" type="submit">
      Submit
    </button>
  </form>
    </div>
  );
};

export default Login;
