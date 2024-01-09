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
  async function sendPushNotification(e) {
    e.preventDefault();
    const message = {
      to: "ExponentPushToken[8hAPIfPxtRIpd1dc2kSbwJ]",
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { someData: "goes here" },
    };
    try {
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      const result = await response.json();
      console.log("Response from Expo push notification service:", result);
    } catch (error) {
      console.error("Error sending push notification:", error);
    }
  }

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
    // axios
    //   .post("https://app.nativenotify.com/api/notification", notification)
    //   .then((res) => console.log(res));
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
        <form onSubmit={sendPushNotification}>
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
