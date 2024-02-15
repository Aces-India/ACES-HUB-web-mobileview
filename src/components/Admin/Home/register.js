// Registration.js
import React, { useState } from 'react';
import axios from 'axios';
import Api from '../../../api';

const Registration = ({ onSuccessfulRegistration, onToggleForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setLoading(true);
    try {
      await Api.post('registeruser', { name, email, phone });
      alert('OTP sent to your email');
      setOtpSent(true);
    } catch (err) {
      alert('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpAndRegister = async () => {
    try {
      await Api.post('verify-register', {
        email,
        otp
      });
      onSuccessfulRegistration();
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
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
          <button className="loginbutton" style={{ backgroundColor: '#213966' }} onClick={sendOtp}>
            <span >Send OTP</span>
          </button>
          <div className="spacing" />
          <button
            className="loginbutton"
            style={{ backgroundColor: '#213966' }}
            onClick={onToggleForm}
          >
            <span >Go to Login</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Registration;
