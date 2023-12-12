import { useContext, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalProvider";
import axios from "axios";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FaRegUserCircle } from "react-icons/fa";

const Blogs = () => {
  const {
    posts,
    setPosts,
    blogpageView,
    setBlogPageView,
    setTitle,
    selectedImage,
    setSelectedImage,
    textareaValue,
    setTextareaValue,
  } = useContext(GlobalContext);
  let navigate = useNavigate();

  const handleAddBlog = () => {
    setBlogPageView("addBlog");
    setTitle("");
    setSelectedImage("");
    setTextareaValue("");
  };
  const fetchBlogs = () => {
    axios.get("https://s-hub-backend.onrender.com/api/post").then((res) => {
      console.log(res);
      setPosts(res.data.posts);
    });
  };
  console.log(posts);
  const handlePosts = (index) => {
    setBlogPageView("blogdisplay");
    console.log("first", posts[index]);
    setTitle(posts[index].post_title);
    setSelectedImage(posts[index].post_img);
    setTextareaValue(posts[index].post_msg);
  };
  return (
    <>
      <div
        style={{
          width: "925px",
          height: "auto",
          marginLeft: "30px",
          marginTop: "30px",
          background: "white",
          cursor: "pointer",
        }}
      >
        {/* <Scrollbars style={{ height: "98vh", width: "890px" }}> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100px",
            margin: "1px",
            border: "1px solid black",
            borderRadius: "10px",
          }}
        >
          {/* <input
            style={{
              width: "100%",
              height: "40px",
              background: "rgb(148, 159, 180)",
              border: "1px solid black  ",
              borderRadius: "8px",
            }}
            placeholder="What do you want to share?"
          /> */}
          <button
            onClick={handleAddBlog}
            style={{
              width: "20%",
              height: "40px",
              borderRadius: "10px",
              marginLeft: "570px",
              cursor: "pointer",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Add Blog
          </button>
          <button
            onClick={fetchBlogs}
            style={{
              width: "20%",
              height: "40px",
              borderRadius: "10px",
              marginLeft: "570px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            Fetch Blogs
          </button>
        </div>
        {posts?.map((user, index) => (
          <div
            className="teambox"
            key={index}
            style={{
              width: "900px",
              height: "auto",
              border: "1px solid black",
              padding: "10px",
              marginBottom: "30px",
              marginTop: "30px",
              borderRadius: "4px 4px 25px 25px",
            }}
            onClick={() => handlePosts(index)}
          >
            <div
              style={{
                background: "",
                border: "2px solid black",
                padding: "30px",
                borderRadius: "30px",
              }}
            >
              <img
                src={user.post_img}
                style={{ width: "100%", height: "300px" }}
              />
            </div>

            <br></br>
            <div style={{ fontSize: "25px", fontWeight: "bold" }}>
              {user.post_title}
            </div>
            <br></br>
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                alignContent: "center",
                alignItems: "center",
                fontSize: "25px",
                borderTop: "1px solid black",
              }}
            >
              <FaRegUserCircle />

              {user.user_id?.name}
            </div>
            {/* <div style={{ fontSize: "25px", fontWeight: "lighter" }}>
                {`${user.post_msg.slice(0, 140)}...`}
              </div> */}
          </div>
        ))}
        {/* </Scrollbars> */}
      </div>
    </>
  );
};

export default Blogs;
