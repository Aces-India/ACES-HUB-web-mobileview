import React from "react";
import Sidebar from './Sidebar'; // Make sure the path is correct
import UsersData from "./userData";

const Dashboard = () => {
  return (
    <div className="MainDashboard">
      <Sidebar />
      <div className="dashboardContent">
        <UsersData />
      </div>
    </div>
  );
};

export default Dashboard;
