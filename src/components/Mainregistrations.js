import React, { useState } from "react";
import Solo from "./Solo";
import Registration from "./Registration";
import Header from './Header';

const Mainregistrations = () => {
  const [role, setRole] = useState("Registration");



  return (
    <>
    <div >
    <Header/>
    <div >
      <div className="RTopSection">
        <div className="RContainer">
        <h1 className="title">Events Registration</h1>
        </div>
        <div className="roleSelector">
          <label style={{fontWeight:'bolder'}}>
            <input
              type="radio"
              value="Registration"
              checked={role === 'Registration'}
              onChange={() => setRole('Registration')}
              className="Rinput"
            />
            Team Registration
          </label>

          <label style={{fontWeight:'bolder'}}>
            <input
              type="radio"      
              value="Solo"
              checked={role === 'Solo'}
              onChange={() => setRole('Solo')}
              className="Rinput"
            />
           Solo Registration
          </label>
        </div>
      </div>
      {role === "Registration" ? <Registration /> : <Solo />}
    </div>
  </div>
</>
);
};

export default Mainregistrations;
