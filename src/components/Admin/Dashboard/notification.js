import axios from "axios";
import React, { Component, useState } from "react";
import b from "../../../assets/b.png";
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const notification = {
      appId: 15368,
      appToken: "ux61qbAfMOOHd6vFroOD7i",
      image: b,
      title: title,
      body: body,
      dateSent: new Date().toLocaleString(),
    };
    axios
      .post("https://app.nativenotify.com/api/notification", notification)
      .then((res) => console.log(res));
    setNotifyModal(false);
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
      <button onClick={sendNotification} className="button">
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
