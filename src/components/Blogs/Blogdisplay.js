import React, { useContext } from "react";
import { GlobalContext } from "../../GlobalProvider";
const Blogdisplay = (index) => {
  const {
    title,
    selectedImage,
    setSelectedImage,
    textareaValue,
    setTextareaValue,
  } = useContext(GlobalContext);
  console.log(title);
  return (
    <>
      <div
        style={{
          width: "900px",
          height: "auto",
          border: "1px solid black",
          marginLeft: "30px",
          display: "block",
          marginTop: "5px",
          justifyContent: "flex-start",
          padding: "10px",
        }}
      >
        <h1 style={{ fontSize: "30px", fontWeight: "bolder" }}>{title}</h1>
        <p
          style={{
            fontSize: "20px",
            fontWeight: "400",
            lineBreak: "normal",
            wordSpacing: "6px",
            lineHeight: "35px",
          }}
        >
          {textareaValue}
        </p>
        <div>
          <img
            src={selectedImage}
            style={{ width: "400px", height: "400px", marginLeft: "240px" }}
          />
        </div>
      </div>
    </>
  );
};
export default Blogdisplay;
