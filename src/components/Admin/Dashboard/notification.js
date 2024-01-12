import axios from "axios";
import React, { Component, useState } from "react";

import { Link, NavLink } from "react-router-dom";

import Modal from "react-modal";

const Notification = () => {
  const [notifyModal, setNotifyModal] = useState();
  const [teamData, setTeamData] = useState();

  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const menuItem = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/dashboard",
      name: "Dashboard",
    },
    {
      path: "/notification",
      name: "Notification",
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const notificationDate = new Date(); // Current date and time
  
    try {
      await axios.post('https://s-hub-backend.onrender.com/api/send-notifications', {
        title,
        body,
        date: notificationDate // Send date with the request
      });
      console.log('Notification request sent to the server');
      setNotifyModal(false);
    } catch (error) {
      console.error('Error sending notification request:', error);
    }
  };
  
  
  
  const closeModal = () => {
    setNotifyModal(false);
  };
  const sendNotification = () => {
    setNotifyModal(true);
  };
  const getNotifications = () => {
    setTeamData(true);
  };
  return (
    <>
      <button onClick={sendNotification} className="userDataBtn">
        Notification
      </button>
      <Modal
        isOpen={notifyModal}
        className="modalStyles"
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div className="modalTitle">
          <h4 className="modalHeader">Notification</h4>
          <button className="modalButton" onClick={closeModal}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="formInput"
            placeholder="title"
            style={{ width: "90%", margin: "10px", height: "40px" }}
          />
          <input
            onChange={(e) => setBody(e.target.value)}
            placeholder="Message"
            style={{ width: "90%", margin: "10px", height: "40px" }}
            className="formInput"
          />
          <button className="button">Send notification</button>
        </form>
      </Modal>
    </>
  );
};
export default Notification;
