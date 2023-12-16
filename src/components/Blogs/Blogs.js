import { useContext, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalProvider";
import axios from "axios";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FaRegUserCircle } from "react-icons/fa";
import CommentModal from "./CommentModal";
import Blogdisplay from "./Blogdisplay";

const Blogs = () => {
  const {
    posts,
    setPosts,
    userName,
    setBlogPageView,
    setTitle,
    selectedImage,
    setSelectedImage,
    textareaValue,
    setTextareaValue,
    email,
    userId,
    setComments,
    setCommentModal,
    loggedInUserDetails,
    setPostDisplay,
  } = useContext(GlobalContext);
  const [postDate, setPostDate] = useState();
  let navigate = useNavigate();

  const handleAddBlog = () => {
    setBlogPageView("addBlog");
    setTitle("");
    setSelectedImage("");
    setTextareaValue("");
  };
  const fetchBlogs = () => {
    axios.get("https://s-hub-backend.onrender.com/api/post").then((res) => {
      setPosts(res.data.posts.reverse());
    });
  };

  const handlePosts = (index) => {
    setTitle(posts[index].post_title);
    setPostDisplay(posts[index]);
    setSelectedImage(posts[index].post_img);
    setTextareaValue(posts[index].post_msg);
    axios
      .get(
        `https://s-hub-backend.onrender.com/api/post/${posts[index].post_id}/comment`
      )
      .then((res) => {
        setComments(res.data);
      });
    setBlogPageView("blogdisplay");
  };

  return (
    <>
      <CommentModal />
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
        {posts?.map((user, index) => {
          const formattedDate = new Date(user.posted_at).toLocaleDateString();
          const formattedTime = new Date(user.posted_at).toLocaleTimeString();
          const dateTimeString = `${formattedDate}  ${formattedTime}`;

          return (
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
                borderRadius: "8px 8px 20px 20px",
              }}
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
                  onClick={() => handlePosts(index)}
                />
              </div>

              <br></br>
              <div
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => handlePosts(index)}
              >
                {user.post_title}
              </div>
              <br></br>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "left",
                  alignContent: "center",
                  alignItems: "center",
                  fontSize: "25px",
                  borderTop: "1px solid black",
                  // background: "black",
                }}
              >
                <div
                  style={{
                    display: "block",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    fontSize: "30px",
                  }}
                >
                  <small style={{ fontSize: "25px" }}>
                    <FaRegUserCircle />
                  </small>
                  {user.user_id?.name}
                  <br></br>
                  <small style={{ fontSize: "15px" }}> {dateTimeString}</small>
                </div>
                <br></br>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    alignContent: "right",
                    alignItems: "right",
                    marginLeft: "540px",
                    fontSize: "25px",
                    border: "1px solid black",
                    borderRadius: "10px",
                    padding: "6px",
                    marginTop: "4px",
                  }}
                  onClick={() => handlePosts(index)}
                >
                  Comments
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Blogs;
