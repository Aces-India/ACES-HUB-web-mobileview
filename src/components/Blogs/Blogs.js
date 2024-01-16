import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import CommentModal from "./CommentModal";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalProvider";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import Api from "../../api";
const Blogs = () => {
  const {
    posts,
    setBlogPageView,
    setTitle,
    setSelectedImage,
    setTextareaValue,
    setComments,
    setPostDisplay,
    setUserId,
    userId,
  } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [likesData, setLikesData] = useState({});

  const handleAddBlog = () => {
    setBlogPageView("addBlog");
    setTitle("");
    setSelectedImage("");
    setTextareaValue("");
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = localStorage.getItem("user_id");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    };

    fetchUserId();
  }, [setUserId]);

  const fetchBlogs = async () => {
    try {
      if (!localStorage.getItem("user_id")) {
        console.error("User ID is missing or empty");
        // Handle the error appropriately, e.g., redirect to the login page
        return;
      }

      const response = await Api.get(
        "post",
        {
          headers: { "user-id": localStorage.getItem("user_id") },
        }
      );

      const fetchedLikesData = {};
      response.data.blogs.forEach((post, index) => {
        fetchedLikesData[index] = {
          userLiked: post.userLiked,
          totalLikes: post.totalLikes,
        };
      });

      setLikesData(fetchedLikesData);
      // Process the response and update state as needed...
    } catch (error) {
      console.error("Error fetching blogs:", error);
      // Handle errors, show user-friendly message...
    }
  };

  useEffect(() => {
    // Fetch likes data for all posts when the component mounts
    if (posts) {
      fetchBlogs();
    }
  }, [posts]);

  const handlePosts = (index) => {
    console.log('in handle post and index is ', posts[index].post.post_id)
    setTitle(posts[index].post.post_title);
    setPostDisplay(posts[index].post);
    setSelectedImage(posts[index].post.post_img);

    Api
      .get(
        `post/${posts[index].post.post_id}/comment`
      )
      .then((res) => {
        setComments(res.data);
      });

    setBlogPageView("blogdisplay");
  };

  const handleLike = async (index, crnt_post_id) => {
    console.log(
      index,
      "this is index in liked func and post post id is this ",
      crnt_post_id
    );
    try {
      if (!posts || !posts[index] || !crnt_post_id) {
        console.error("Invalid post data:", posts);
        return;
      }

      const currentPostId = posts.post_id;

      // Optimistically update UI
      const updatedLikesData = { ...likesData };
      updatedLikesData[index] = {
        userLiked: !likesData[index]?.userLiked,
        totalLikes: likesData[index]?.userLiked
          ? likesData[index]?.totalLikes - 1
          : likesData[index]?.totalLikes + 1,
      };

      setLikesData(updatedLikesData);

      if (likesData[index]?.userLiked) {
        await Api
          .delete(
            `post/${crnt_post_id}/like`,
            { data: { user_id: localStorage.getItem("user_id") } }
          )
          .then((res) => {
            console.log(res.data, "unlike");
          });
      } else {
        await Api
          .post(
            `post/${crnt_post_id}/like`,
            { user_id: localStorage.getItem("user_id") }
          )
          .then((res) => {
            console.log(res.data, "like");
          });
      }
    } catch (error) {
      // In case of an error, revert the UI
      console.error("Error updating like:", error);
      const updatedLikesData = { ...likesData };
      setLikesData(updatedLikesData);
    }
  };

  return (
    <>
      
      <div
        style={{
          width: "900px",
          height: "auto",
          marginLeft: "30px",
          marginTop: "30px",
          background: "white",
          cursor: "pointer",
        }}
      >
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
          const formattedDate = new Date(
            user.post.posted_at
          ).toLocaleDateString();
          const formattedTime = new Date(
            user.post.posted_at
          ).toLocaleTimeString();
          const dateTimeString = `${formattedDate}  ${formattedTime}`;

          return (
            <div
              className="teambox"
              key={index}
              style={{
                height: "auto",
                borderTop: "1px solid grey",
                padding: "10px",
                marginBottom: "10px",
                marginTop: "10px",
                borderBottom: "1px solid grey",
              }}
            >
              <div>
                <img
                  src={user.post.post_img}
                  style={{
                    width: "100%",
                    height: "500px",
                    border: "2px solid grey",
                    borderRadius: "30px",
                  }}
                  onClick={() => handlePosts(index)}
                />
              </div>

              <br />
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => handlePosts(index)}
              >
                {user.post.post_title}
              </div>
              <br />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "left",
                  alignContent: "center",
                  alignItems: "center",
                  fontSize: "25px",
                  borderTop: "1px solid black",
                }}
              >
                <div style={{ marginRight: "50%", fontSize:'18px',textAlign:'center' }}>
                  
                  
                  <div style={{ fontSize: '17px', fontWeight: 'bold', color: '#333', }}>
                  <FaRegUserCircle style={{ width: 35, height: 35,paddingRight:10,paddingTop:5 }} />
                  {user.post.user_id?.name}
                </div>
                
                  <br />
                  <small style={{ fontSize: "15px" }}> {dateTimeString}</small>
                </div>
                <br />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button
                    onClick={() => handleLike(index, user.post.post_id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      marginRight: "8px",
                    }}
                  >
                    <FaThumbsUp
                      style={{
                        fontSize: "18px",
                        color: likesData[index]?.userLiked
                          ? "#1877f2"
                          : "black",
                        marginRight: "4px",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "18px",
                        color: likesData[index]?.userLiked
                          ? "#1877f2"
                          : "black",
                      }}
                    >
                      Like
                    </span>
                  </button>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#606770",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ marginRight: "4px" }}>
                      {likesData[index]?.totalLikes}
                    </span>
                    <span style={{ marginRight: "4px" }}>Likes</span>
                  </div>
                </div>

                <div
                  style={{
                    
                    color: "#213966",
                    cursor: "pointer",
                  }}
                  onClick={() => handlePosts(index)}
                >
                  <div style={{ marginLeft: "10px", color: "black" }}>
                    <FaComment style={{ marginLeft: "10px" }} />
                  </div>
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
