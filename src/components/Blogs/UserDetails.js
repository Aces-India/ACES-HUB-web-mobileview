import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalProvider";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";

const UserDetails = () => {
  const {
    blogModal,
    setBlogModal,
    userName,
    setBlogPageView,
    setPosts,
    selectedImage,
    setSelectedImage,
    textareaValue,
    setTextareaValue,
  } = useContext(GlobalContext);
  let navigate = useNavigate();
  const handlePostPage = () => {
    setBlogPageView(false);
    axios.get("https://s-hub-backend.onrender.com/api/post").then((res) => {
      console.log(res);
      setPosts(res.data.posts);
    });
  };
  console.log(userName);
  return (
    <>
      <div
        style={{
          width: "300px",
          border: "1px solid black",
          height: "440px",
          marginLeft: "50px",
          marginTop: "30px",
          display: "block",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          borderRadius: "10px",
          background: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            marginTop: "40px",
            fontSize: "25px",
            borderBottom: "1px solid black",
          }}
        >
          <FaUserAlt />
          {userName}
        </div>
        <p
          onClick={handlePostPage}
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            marginTop: "40px",
            marginLeft: "55px",
            fontSize: "25px",
            cursor: "pointer",
            border: "1px solid black",
            borderRadius: "10px",
            width: "200px",
          }}
        >
          Posts
        </p>

        <br></br>
      </div>
    </>
  );
};

export default UserDetails;
