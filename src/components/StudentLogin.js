import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { GlobalContext } from "../../GlobalProvider";
import { GlobalContext } from "../GlobalProvider";

const StudentLogin = () => {
  const {
    user,
    setUser,
    setEmail,
    email,
    setUSerName,
    userName,
    userId,
    setUserId,
  } = useContext(GlobalContext);
  const [verifyOtp, setVerifyOtp] = useState();
  const [otp, setOtp] = useState();
  const [btn, setBtn] = useState(true);
  const [error, setError] = useState();
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: user.email,
    };
    var x = document.getElementById("otp");
    var y = document.getElementById("loginBtn");
    console.log(userData);
    axios
      .post("https://s-hub-backend.onrender.com/api/login", userData)
      // .post("http://localhost:5001/api/login", userData)
      .then((response) => {
        // setVerifyOtp(response.data.otp);
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
      .post("https://s-hub-backend.onrender.com/api/verify-login", userDetails)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("jwtToken", token);
        navigate("/Home");
        console.log(response);
        setUSerName(response.data.name);
        setEmail(response.data.email);
        setUserId(response.data.user_id);
      })
      .catch((response) => {
        setError(response.response.data);
      });
  };
  return (
    <>
      <div className="LoginPage">
        <div className="">
          <h4
            style={{
              marginLeft: "-165px",
              fontWeight: "500",
            }}
          >
            Student Login
          </h4>
        </div>
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
            {error && (
              <>
                <small>{error}</small>
              </>
            )}
          </p>{" "}
          <div
            style={{
              display: "flex",
              marginTop: "10px",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {btn ? (
              <button
                className="formBtn"
                onClick={handleSubmit}
                id="loginBtn"
                style={{
                  width: "120px",
                  height: "40px",
                  backgroundColor: "#1A73E8",
                  color: "white",
                  fontWeight: "400",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
            ) : (
              <button
                id="verifyBtn"
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
export default StudentLogin;
