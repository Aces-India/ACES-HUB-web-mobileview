import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from './Header';
import Api from "../api";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await Api.get("notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error(`Error fetching notifications: ${error.message}`);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div >
    <Header />

      <div style={listContainerStyle}>
        <ul>
          {notifications.map((item) => (
            <li key={item._id} style={notificationItemStyle}>
              <p style={titleStyle}>{item.title}</p>
              <p style={textStyle}>{new Date(item.date).toLocaleDateString()}</p>
              <p style={textStyle}>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};



const listContainerStyle = {
  padding: "10px",
};

const notificationItemStyle = {
  backgroundColor: "#FFF",
  borderRadius: "8px",
  padding: "15px",
  margin: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "black",
  marginBottom: "8px",
};

const textStyle = {
  fontSize: "18px",
  color: "black",
  marginTop: "8px",
};

export default Notifications;
