import { useContext, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalProvider";
const Blogs = () => {
  const { blogModal, setBlogModal, blogpageView, setBlogPageView } =
    useContext(GlobalContext);
  let navigate = useNavigate();

  const handleAddBlog = () => {
    setBlogPageView("addBlog");
  };
  return (
    <>
      <div
        style={{
          width: "900px",
          height: "500px",
          border: "1px solid black",
          marginLeft: "30px",
          marginTop: "30px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "50px",
            padding: "30px",
            margin: "10px",
            border: "1px solid black",
          }}
        >
          <input
            style={{
              width: "100%",
              height: "40px",
              background: "rgb(148, 159, 180)",
              border: "1px solid black  ",
              borderRadius: "8px",
            }}
            placeholder="What do you want to share?"
          />
          <button
            onClick={handleAddBlog}
            style={{
              width: "auto",
              height: "auto",
              marginLeft: "30px",
              cursor: "pointer",
            }}
          >
            Add Blog
          </button>
        </div>
      </div>
    </>
  );
};

export default Blogs;
