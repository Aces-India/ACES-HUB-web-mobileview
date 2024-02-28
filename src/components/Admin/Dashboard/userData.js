import React, { Component, useState } from "react";
import axios from "axios";
import XlsExport from "xlsexport";
import Modal from "react-modal";
import { Scrollbars } from "react-custom-scrollbars-2";
import Notification from "./notification";
import Api from "../../../api";

const UsersData = () => {
  const [users, setUsers] = useState([]);
  const [team, setTeam] = useState([]);
  const [soloRegistration, setSoloRegistration] = useState([]);

  const [display, setDisplay] = useState();
  const [teamData, setTeamData] = useState();
  const [soloRegistrationData, setSoloRegistrationData] = useState();

  const [value, setValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const fetchUsers = () => {
    setDisplay(true);
    Api
      .get("getUsers")
      .then((res) => setUsers(res.data));
  };

  const fetchTeams = () => {
    setDisplay(false);

    Api
      .get("getTeamDetails")
      .then((res) => {
        setTeam(res.data);
        setFilteredUsers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching team details:", error);
      });
  };
  const fetchSoloRegistration = () => {
    setDisplay("soloRegistraiton");
    Api
      .get("getSoloRegistrationDetails")
      .then((res) => {
        setSoloRegistration(res.data);
        setFilteredUsers(res.data); // Ensure this is updated to reflect the latest data
      })
      .catch((error) => {
        console.error("Error fetching Solo Registration details:", error);
      });
};

  const downloadFile = () => {
    if ((users.length > 0) & display) {
      const dataSample = users.map((user, index) => {
        return {
          name: user.name,
          email: user.email,
          phone: user.phone,
        };
      });

      const xls = new XlsExport(dataSample, "Users");
      xls.exportToXLS();
    } else if ((team.length > 0) & !display) {
      const dataSample = team.map((user, index) => {
        return {
          TeamName: user.teamName,
          teamLeaderName: user.teamLeaderName,
          teamMembers: user.teamMembers,
          college: user.college,
          branch: user.branch,
          rollNumber: user.rollNumber,
          email: user.email,
          mobileNumber: user.mobileNumber,
          event: user.event,
          team_member_1: user.team_member_1,
          team_member_1_roll_no: user.team_member_1_roll_no,
          team_member_1_gender: user.team_member_1_gender,
          team_member_2: user.team_member_2,
          team_member_2_roll_no: user.team_member_2_roll_no,
          team_member_2_gender: user.team_member_2_gender,
          team_member_3: user.team_member_3,
          team_member_3_roll_no: user.team_member_3_roll_no,
          team_member_3_gender: user.team_member_3_gender,
          team_member_4: user.team_member_4,
          team_member_4_roll_no: user.team_member_4_roll_no,
          team_member_4_gender: user.team_member_4_gender,
          team_member_5: user.team_member_5,
          team_member_5_roll_no: user.team_member_5_roll_no,
          team_member_5_gender: user.team_member_5_gender,
          track: user.track,
          file_path: user.file_path,
        };
      });

      const xls = new XlsExport(dataSample, "Team");
      xls.exportToXLS();
    }  else if (soloRegistration.length > 0 && display === "soloRegistraiton") {
      const dataSample = soloRegistration.map((user, index) => {
        return {
          name: user.name,
          RollNumber: user.rollNumber,
          Gender: user.gender,
          College: user.college,
          Event: user.event,
          Branch: user.branch,
          Email: user.email,
          MobileNumber: user.mobileNumber,
          TeamName: user.teamName,
          Position: user.position,
          Track: user.track,
          File: user.file_path,
        };
      });

      const xls = new XlsExport(dataSample, "Solo Registration");
      xls.exportToXLS();
    } else {
      alert("Fetch data to download Excel");
    }
};
  const handleTeam = (index) => {
    setTeamData(true);
    const dataSample = team
      .map((user, i) => {
        if (i === index) {
          // If the current index matches the specified index, include selected properties
          return {
            TeamName: user.teamName,
            teamLeaderName: user.teamLeaderName,
            teamMembers: user.teamMembers,
          };
        }
        // If the current index does not match, return null or an empty object
        return null;
      })
      .filter(Boolean); // Filter out null values
    setValue(team[index]);
  };
  const handleSoloRegistration = (index) => {
    setSoloRegistrationData(true);

    setValue(soloRegistration[index]);
  };

  const closeModal = () => {
    setTeamData(false);
    setSoloRegistrationData(false);
  };
  const handleSearch = (value) => {
    setFilterValue(value);
    if (display === true) {
      // Search for users
      const filtered = users.filter(
        (user) =>
          user.name && user.name.toLowerCase().includes(value.toLowerCase())
      );

      setFilteredUsers(filtered);
    } else if (display === false) {
      // Search for teams
      const filtered = team.filter(
        (user) =>
          user.teamName &&
          user.teamName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      // Search for teams
      const filtered = soloRegistration.filter(
        (user) =>
          user.name && user.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <>
      <button onClick={fetchUsers} className="userDataBtn">
        Fetch Users
      </button>
      <button onClick={fetchTeams} className="userDataBtn">
        Fetch Teams
      </button>
      <button onClick={fetchSoloRegistration} className="userDataBtn">
        Fetch Solo Registration
      </button>
      <Notification />

      <button onClick={downloadFile} className="userDataBtn">
        Export CSV
      </button>

      <input
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          width: "auto",
          height: "30px",
          borderRadius: "8px",
          float: "right",
          marginRight: "10px",
        }}
      />
      {display === true ? (
        <Scrollbars style={{ width: 1200, height: "600px" }}>
          <table className="headerKeys">
            <thead>
              <tr className="header">
                <th className="Keys">Name</th>
                <th className="Keys">Email</th>
                <th className="Keys">Phone</th>
              </tr>
            </thead>
            <tbody>
              {filterValue
                ? // Display filtered teams if there's a filter value
                  filteredUsers.map((user, index) => {
                    return (
                      <tr className="Keys" key={user.id}>
                        <td className="Keys">{user.name}</td>
                        <td className="Keys">{user.email}</td>
                        <td className="Keys">{user.phone}</td>
                      </tr>
                    );
                  })
                : users.map((user) => {
                    return (
                      <tr className="Keys" key={user.id}>
                        <td className="Keys">{user.name}</td>
                        <td className="Keys">{user.email}</td>
                        <td className="Keys">{user.phone}</td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </Scrollbars>
      ) : display === false ? (
        <Scrollbars style={{ width: 1200, height: "600px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              height: "145px",
            }}
          >
            {filterValue
              ? // Display filtered teams if there's a filter value
                filteredUsers.map((user, index) => (
                  <div
                    className="teambox"
                    key={index}
                    style={{
                      width: "300px",
                      height: "60px",
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      border: "1px solid black",
                      margin: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleTeam(index)}
                  >
                    {user.teamName}
                  </div>
                ))
              : // Display all teams if there's no filter value
                team.map((user, index) => (
                  <div
                    className="teambox"
                    key={index}
                    style={{
                      width: "300px",
                      height: "60px",
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      border: "1px solid black",
                      margin: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleTeam(index)}
                  >
                    {user.teamName}
                  </div>
                ))}
          </div>
          {teamData && (
            <Modal
              isOpen={teamData}
              className="teamDataModalStyles"
              onRequestClose={closeModal}
              ariaHideApp={false}
            >
              <div className="modalTitle">
                <h4 className="modalHeader">Team Details</h4>
                <button className="modalButton" onClick={closeModal}>
                  X
                </button>
              </div>
              <div className="modalContent">
                <Scrollbars style={{ width: "100%", height: " 480px" }}>
                  {Object.keys(value).map((key, index) => (
                    <>
                      <label
                        style={{
                          textTransform: "uppercase",
                          wordSpacing: "4px",
                          letterSpacing: "1px",
                          fontWeight: "900",
                        }}
                      >
                        {key}
                        <br></br>
                        <input
                          key={index}
                          placeholder={key}
                          className="modalInput"
                          value={value[key]}
                          readOnly
                          style={{ width: "90%" }}
                        />
                      </label>
                      <br></br>
                      <br></br>
                    </>
                  ))}
                </Scrollbars>
              </div>
            </Modal>
          )}
        </Scrollbars>
      ) : display === "soloRegistraiton" ? (
        <Scrollbars style={{ width: 1200, height: "600px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              height: "145px",
            }}
          >
            {filterValue
              ? // Display filtered teams if there's a filter value
                filteredUsers.map((user, index) => (
                  <div
                    className="teambox"
                    key={index}
                    style={{
                      width: "300px",
                      height: "60px",
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      border: "1px solid black",
                      margin: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSoloRegistration(index)}
                  >
                    {user.name}
                  </div>
                ))
              : // Display all teams if there's no filter value
                soloRegistration.map((user, index) => (
                  <div
                    className="teambox"
                    key={index}
                    style={{
                      width: "300px",
                      height: "60px",
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      border: "1px solid black",
                      margin: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSoloRegistration(index)}
                  >
                    {user.name}
                  </div>
                ))}
          </div>
          {soloRegistrationData && (
            <Modal
              isOpen={soloRegistrationData}
              className="teamDataModalStyles"
              onRequestClose={closeModal}
              ariaHideApp={false}
            >
              <div className="modalTitle">
                <h4 className="modalHeader">Solo Registration Details</h4>
                <button className="modalButton" onClick={closeModal}>
                  X
                </button>
              </div>
              <div className="modalContent">
                <Scrollbars style={{ width: "100%", height: " 480px" }}>
                  {Object.keys(value).map((key, index) => (
                    <>
                      <label
                        style={{
                          textTransform: "uppercase",
                          wordSpacing: "4px",
                          letterSpacing: "1px",
                          fontWeight: "900",
                        }}
                      >
                        {key}
                        <br></br>
                        <input
                          key={index}
                          placeholder={key}
                          className="modalInput"
                          value={value[key]}
                          readOnly
                          style={{ width: "90%" }}
                        />
                      </label>
                      <br></br>
                      <br></br>
                    </>
                  ))}
                </Scrollbars>
              </div>
            </Modal>
          )}
        </Scrollbars>
      ) : (
        <div></div>
      )}
    </>
  );
};
export default UsersData;