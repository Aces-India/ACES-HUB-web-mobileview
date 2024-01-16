import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../GlobalProvider";
import "../index.css";
import Api from "../api";

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  // const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    setUSerName,
    email,
    setEmail,
    setUserId,
    loggedInUserDetails,
    setLoggedInUserDetails,
  } = useContext(GlobalContext);
  const Navigate = useNavigate();

  const resetState = () => {
    setIsLoggedIn(false);
    setIsLogin(true);
    setEmail("");
    setName("");
    setPhone("");
    setOtp("");
    setOtpSent(false);
    setLoading(false);
  };
  // Define the LoadingOverlay component
  const LoadingOverlay = () => (
    <div className="loadingOverlay">
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
    setEmail("");
    setName("");
    setPhone("");
    setOtp("");
    setOtpSent(false);
  };

  const storeToken = async (token) => {
    try {
      // Your AsyncStorage code can be replaced with browser's localStorage or any other suitable web storage mechanism
      localStorage.setItem("userToken", token);
    } catch (e) {
      console.error("Error saving token", e);
    }
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      if (isLogin) {
        await Api.post("login", {
          email,
        });
      } else {
        await Api.post(
          "registeruser",
          { name, email, phone }
        );
      }
      alert("OTP sent to your email");
      setOtpSent(true);
    } catch (err) {
      alert("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    await sendOtp();
  };

  const verifyOtpAndRegister = async () => {
    try {
      const response = await Api.post(
        "verify-register",
        {
          email,
          otp,
          name,
          phone,
        }
      );
      await storeToken(response.data.token);
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      alert("Registration successful");

      Navigate("/Home");
    } catch (err) {
      alert("Registration failed");
    }
  };

  const handleLogin = async () => {
    if (!email) {
      alert("Please enter your correct email");
      return;
    }

    await sendOtp();
  };

  const verifyOtpAndLogin = async () => {
    try {
      const response = await Api.post(
        "verify-login",
        {
          email,
          otp,
        }
      );
  
      // Store user details in localStorage
      localStorage.setItem("user_id", response.data.user_id);
  
      // Store token in localStorage
      await storeToken(response.data.token);
  
      // Update state
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      setLoggedInUserDetails(response.data);
      setUSerName(response.data.name);
      setEmail(response.data.email);
      setUserId(response.data.user_id);

      try {
        // Your AsyncStorage code can be replaced with browser's localStorage or any other suitable web storage mechanism
        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("user_name", response.data.name);
        localStorage.setItem("user_email", response.data.email);
        
      } catch (e) {
        console.error("Error saving token", e);
      }

      alert("Login successful");
      Navigate("/Home");
    } catch (err) {
      alert("Login failed");
    }
  };
  

  return (
    <div>
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
                <button className="button" onClick={verifyOtpAndLogin}>
                  Verify OTP & Login
                </button>
              </>
            ) : (
              <div className="button-Container">
                <button
                  className="loginbutton"
                  style={{ backgroundColor: "#213966" }}
                  onClick={handleLogin}
                >
                  <span>Send OTP</span>
                </button>
                <div className="spacing" />
                <button
                  className="loginbutton"
                  style={{ backgroundColor: "#213966" }}
                  onClick={toggleForm}
                >
                  <span>Go to Register</span>
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
                <button className="button" onClick={verifyOtpAndRegister}>
                  Verify OTP & Register
                </button>
              </>
            ) : (
              <div className="button-Container">
                <button
                  className="loginbutton"
                  style={{ backgroundColor: "#213966" }}
                  onClick={handleRegister}
                >
                  <span>Send OTP</span>
                </button>
                <div className="spacing" />
                <button
                  className="loginbutton"
                  style={{ backgroundColor: "#213966" }}
                  onClick={toggleForm}
                >
                  <span>Go to Login</span>
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
