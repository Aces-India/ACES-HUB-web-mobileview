import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../index.css";

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
 

  const resetState = () => {
    setIsLoggedIn(false);
    setIsLogin(true);
    setEmail('');
    setName('');
    setPhone('');
    setOtp('');
    setOtpSent(false);
    setLoading(false);
  };

  // Define the LoadingOverlay component
  const LoadingOverlay = () => (
    <div  className="loadingOverlay">
      <div className="loadingBox">
        <div>Loading...</div>
      </div>
    </div>
  );

  useEffect(() => {
    resetState();
  }, []);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setName('');
    setPhone('');
    setOtp('');
    setOtpSent(false);
  };

  const storeToken = async (token) => {
    try {
      // Your AsyncStorage code can be replaced with browser's localStorage or any other suitable web storage mechanism
      localStorage.setItem('userToken', token);
    } catch (e) {
      console.error('Error saving token', e);
    }
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      if (isLogin) {
        await axios.post('https://s-hub-backend.onrender.com/api/login', { email });
      } else {
        await axios.post('https://s-hub-backend.onrender.com/api/registeruser', { name, email, phone });
      }
      alert('OTP sent to your email');
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      alert('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !phone) {
      alert('Please fill all fields');
      return;
    }

    await sendOtp();
  };

  const verifyOtpAndRegister = async () => {
    try {
      const response = await axios.post('https://s-hub-backend.onrender.com/api/verify-register', {
        email,
        otp,
        name, 
        phone
      });
      console.log(response, 'this is response');
      await storeToken(response.data.token);
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      alert('Registration successful');
     
      Navigate('/Home');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  const handleLogin = async () => {
    if (!email) {
      alert('Please enter your correct email');
      return;
    }

    await sendOtp();
  };

  const verifyOtpAndLogin = async () => {
    try {
      const response = await axios.post('https://s-hub-backend.onrender.com/api/verify-login', {
        email,
        otp
      });

      await storeToken(response.data.token);
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      alert('Login successful');
      // Replace the following line with the navigation code for React JS
      // history.push('/home'); // Use the appropriate navigation mechanism for React JS
      Navigate('/Home');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div >
      {loading && <LoadingOverlay />}
       

      <div className="formContainer">
        {isLogin ? (
          <>
            <input
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {otpSent ? (
              <>
                <input
                  className="input"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  className="button"
                  onClick={verifyOtpAndLogin}
                >
                  Verify OTP & Login
                </button>
              </>
            ) : (
              <div className="button-Container">
                <button
                  className="loginbutton"
                  style={{ backgroundColor: '#213966' }}
                  onClick={handleLogin}
                >
                  <span   >Send OTP</span>
                </button>
                <div className="spacing" />
                <button
                  className="loginbutton"
                  style={{ backgroundColor: '#213966' }}
                  onClick={toggleForm}
                >
                  <span >Go to Register</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <>
          <div className="login-input">
          <input
            className="input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        
            {otpSent ? (
              <>
                <input
                  className="input"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  className="button"
                  onClick={verifyOtpAndRegister}
                >
                  Verify OTP & Register
                </button>
              </>
            ) : (
              <div className="button-Container">
                <button
                  className="loginbutton"
                  style={{ backgroundColor: '#213966' }}
                  onClick={handleRegister}
                >
                  <span   >Send OTP</span>
                </button>
                <div className="spacing" />
                <button
                  className="loginbutton"
                  style={{ backgroundColor: '#213966' }}
                  onClick={toggleForm}
                >
                  <span   >Go to Login</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Main;