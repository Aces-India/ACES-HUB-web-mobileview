import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { GlobalContext } from "../../GlobalProvider";
import { GlobalContext } from "../../../GlobalProvider";

const Login = () => {
  const { user, setUser, setEmail, email } = useContext(GlobalContext);
  // const [user, setUser] = useState({
  //   email: "",
  // });
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

    axios
      .post("https://aces-hackathon.onrender.com/api/Adminlogin", userData)
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
      .post(
        "https://aces-hackathon.onrender.com/api/verifyAdminlogin",
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
    // if (otp === verifyOtp) {
    //   navigate("/dashboard");
    // } else {
    //   alert("incorrect otp");
    // }
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
            Admin Login
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
export default Login;
