import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import Header from "../Header";
import UserDetails from "./UserDetails";
import { FaImage } from "react-icons/fa";

const WriteBlog = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textareaValue, setTextareaValue] = useState("");
  const [rows, setRows] = useState(1);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleChange = (event) => {
    setTextareaValue(event.target.value);
    setRows(event.target.scrollHeight / 20); // Adjust the divisor based on your font size
  };
  return (
    <>
      {/* <Header /> */}
      {/* <input type="file" onChange={handleImageChange} accept="image/*" /> */}
      <label
        style={{ marginLeft: "30px", marginTop: "10px", cursor: "pointer" }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e)}
        />
        <FaImage />
      </label>
      <div
        style={{
          width: "900px",
          height: "600px",
          border: "1px solid black",
          marginLeft: "30px",
          display: "block",
          marginTop: "-5px",
          justifyContent: "flex-start",
          padding: "10px",
        }}
      >
        <textarea
          placeholder="Title..."
          className="writeBlogInput"
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
              minHeight: "230px", // Set a minimum height
              marginTop: "4px",
              fontSize: "18px",
              fontWeight: "900",
              verticalAlign: "top",
              resize: "none",
              border: "none",
              overflowY: "hidden", // Hide vertical scrollbar
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
        </Scrollbars>

        {/* <button onClick={handleUpload}>Upload Image</button> */}
      </div>
    </>
  );
};
export default WriteBlog;
