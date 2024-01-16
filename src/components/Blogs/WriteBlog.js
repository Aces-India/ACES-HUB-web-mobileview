import React, { useContext, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import Header from "../Header";
import UserDetails from "./UserDetails";
import { FaImage } from "react-icons/fa";
import axios from "axios";
import { GlobalContext } from "../../GlobalProvider";
import Api from "../../api";

const WriteBlog = () => {
  const { userName, email, userId, setUserId, title, setTitle } =
    useContext(GlobalContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [textareaValue, setTextareaValue] = useState("");

  const [rows, setRows] = useState(1);
  const [rowss, setRowss] = useState(1);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  const handleChange = (event) => {
    setTextareaValue(event.target.value);
    // setRows(event.target.scrollHeight / 20);
  };
  const handleChanges = (event) => {
    setTitle(event.target.value);
    console.log(title)
    setRowss(event.target.scrollHeight / 20);
  };
  const handlePost = () => {

    const DataObject = new FormData();
      // Appending text-based form data
      if (selectedImage) {
        DataObject.append('file', selectedImage);
      }
      DataObject.append('post_title', title);
      DataObject.append('post_msg', textareaValue);
      DataObject.append('user_email', email);
      DataObject.append('user_id', localStorage.getItem('user_id'));
  
      console.log(DataObject,'before hitting api this is the data we are sending');

    // const DataObject = {
    //   file: selectedImage,
    //   post_title: title,
    //   post_msg: textareaValue,
    //   user_email: email,
    //   user_id: localStorage.getItem('user_id'),
    // };
    Api
      .post("post", DataObject, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("Submitted Successfully");
        setTextareaValue("");
        setTitle("");
        setSelectedImage("");
      })
      .catch((response) => {
        console.log(response.data);
      });
  };
  return (
    <>
      {/* <Header /> */}
      {/* <input type="file" onChange={handleImageChange} accept="image/*" /> */}
      {/* <label
        style={{ marginLeft: "30px", marginTop: "10px", cursor: "pointer" }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e)}
        />
        <FaImage />
      </label> */}

      <div
        style={{
          width: "900px",
          height: "600px",
          border: "1px solid black",
          marginLeft: "30px",
          display: "block",
          marginTop: "30px",
          justifyContent: "flex-start",
          padding: "10px",
        }}
      >
        <textarea
          placeholder="Title..."
          className="writeBlogInput"
          value={title}
          onChange={handleChanges}
          rowss={rowss}
          style={{
            height: "100px",
            fontSize: "30px",
            fontWeight: "900",
            resize: "none",
            marginTop: "0px",
            overflow: "hidden",
          }}
        />
        <br></br>
        <Scrollbars style={{ height: "500px" }}>
          <textarea
            placeholder="Paragraph..."
            className="writeBlogInput"
            value={textareaValue}
            onChange={handleChange}
            rows={rows}
            style={{
              minHeight: "230px",
              marginTop: "4px",
              fontSize: "18px",
              fontWeight: "900",
              verticalAlign: "top",
              resize: "none",
              border: "none",
            }}
          ></textarea>
          {selectedImage && (
            <div>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}
          <button
            className="btn"
            style={{
              cursor: "pointer",
              width: "10%",
              border: "1px solid black",
              borderRadius: "8px",
            }}
            onClick={handlePost}
          >
            Post
          </button>
          <button className="btn" onClick={handlePost}>
            <label
              style={{
                margin: "10px",
                marginTop: "10px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e)}
              />
              
            </label>
          </button>
        </Scrollbars>

        {/* <button onClick={handleUpload}>Upload Image</button> */}
      </div>
    </>
  );
};
export default WriteBlog;
