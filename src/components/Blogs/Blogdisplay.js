import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalProvider";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
import Api from "../../api";
const Blogdisplay = ({ post }) => {
  const {
    title,
    selectedImage,
    setSelectedImage,
    userId,
    comments,
    postDisplay,
    setComments,
  } = useContext(GlobalContext);
  const [commentText, setCommentText] = useState();
  const postComment = () => {
    if (!postDisplay || !postDisplay.post_id) {
      console.error("Post ID not found");
      

      return;
    }
    const obj = {
      user_id: localStorage.getItem('user_id'),
      comnt_msg: commentText,
    };
    Api
      .post(
        `post/${postDisplay?.post_id}/comment`,
        obj
      )
      .then((res) => {
        alert("Comment Successfully");
        setCommentText("");
        console.log(res);
      });
  };

  useEffect(() => {
    // Fetch comments whenever the component mounts or commentText changes
    if (postDisplay && postDisplay.post_id) {
      Api
        .get(`post/${postDisplay.post_id}/comment`)
        .then((res) => {
          setComments(res.data.reverse());
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    }
  }, [commentText, postDisplay?.post_id]);
  
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
          background: "white",
        }}
      >
        <h1 style={{ fontSize: "30px", fontWeight: "bolder" }}>
          {postDisplay?.post_title}
        </h1>
        <p
          style={{
            fontSize: "20px",
            fontWeight: "400",
            lineBreak: "normal",
            wordSpacing: "6px",
            lineHeight: "35px",
            
            
          }}
        >
          {postDisplay?.post_msg}
        </p>
        <div>
          <img
            src={postDisplay?.post_img}
            style={{ width: "400px", height: "400px", marginLeft: "240px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",

            fontSize: "25px",
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <FaRegUserCircle />
            {postDisplay?.user_id?.name}
          </div>
          <br></br>
          <div style={{ marginLeft: "90px" }}>
            <input
              className="formInput"
              placeholder="Add comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={{
                width: "500px",
                margin: "10px",
                height: "40px",
                border: "2px solid black",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              fontSize: "20px",
              border: "1px solid black",
              borderRadius: "10px",
              padding: "6px",
              marginTop: "4px",
              height: "30px",
              width: "10%",
              color: "#fff",
              background: "#213966",
              marginLeft: "60px",
              cursor: "pointer",
            }}
            onClick={postComment}
          >
            Post
          </div>
        </div>
        <div>
          {comments &&
            comments?.map((comment, index) => {
              const formattedDate = new Date(
                comment.commented_at
              ).toLocaleDateString();
              const formattedTime = new Date(
                comment.commented_at
              ).toLocaleTimeString();
              const dateTimeString = `${formattedDate}  ${formattedTime}`;
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                  key={comment.id}
                >
                  <FaRegUserCircle size={40} />

                  <div
                    style={{
                      background: "#fff",
                      width: "100%",
                      border: "2px solid black",
                      margin: "10px",
                      fontSize: "20px",
                      display: "grid",
                      gridTemplateColumns: "1fr,1fr",

                      justifyContent: "left",
                      alignItems: "left",
                      alignContent: "left",
                      borderRadius: "8px",
                      marginLeft: "10px",
                      padding: "8px",
                    }}
                  >
                  
                    <div
                      style={
                        {
                          // display: "flex",
                          // flexDirection: "column",
                          // justifyContent: "center",
                          // alignItems: "center",
                          // alignContent: "center",
                          // background: "black",
                        }
                      }
                    >
                      <small style={{ fontWeight: "bolder", fontSize: "25px" }}>
                        {comment?.user_id?.name}
                      </small>
                      <br></br>
                      {comment?.comment_msg}
                    </div>
                    <small style={{ marginLeft: "600px" }}>
                      {dateTimeString}
                    </small>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};


export default Blogdisplay;