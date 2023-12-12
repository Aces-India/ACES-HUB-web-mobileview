import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../GlobalProvider";

const Login = () => {
  const { user, setUser, setEmail, email } = useContext(GlobalContext);
  const [otp, setOtp] = useState();
  const [btn, setBtn] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: user.email,
    };

    axios
      .post("https://s-hub-backend.onrender.com/api/Adminlogin", userData)
      .then((response) => {
        setEmail(response.data.email);
        setBtn(false);
        setError("");
      })
      .catch((response) => {
        setError(response.response.data);
      });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser({
      ...user,
      [id]: value,
    });
  };

  const handleVerifyChange = (e) => {
    e.preventDefault();
    const userDetails = {
      email: email,
      otp: otp,
    };

    axios
      .post(
        "https://s-hub-backend.onrender.com/api/verifyAdminlogin",
        userDetails
      )
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("jwtToken", token);
        navigate("/dashboard"); 
      })
      .catch((response) => {
        setError(response.response.data);
      });
  };

  return (
    <>
      <div className="formContainer">
        
        <form className="LoginForm">
          {btn ? (
            <input
              className="formInput"
              onChange={handleChange}
              value={user.email}
              id="email"
              type="email"
              placeholder="Email"
              required
            />
          ) : (
            <input
              className="formInput"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              id="otp"
              type="number"
              placeholder="OTP"
            />
          )}
          <p style={{ color: "red" }}>
            {error && <small>{error}</small>}
          </p>
          <div className="formBtnContainer">
            {btn ? (
              <button
                className="formBtn"
                onClick={handleSubmit}
                style={{backgroundColor:"#213966"}}
              >
                Login
              </button>
            ) : (
              <button
                className="formBtn"
                onClick={handleVerifyChange}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
