import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalProvider";
const UserDetails = () => {
  const { blogModal, setBlogModal, blogpageView, setBlogPageView } =
    useContext(GlobalContext);
  let navigate = useNavigate();
  const handlePostPage = () => {
    setBlogPageView(false);
  };
  return (
    <>
      <div
        style={{
          width: "300px",
          border: "1px solid black",
          height: "440px",
          marginLeft: "50px",
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <br></br>
        <button onClick={handlePostPage}>Posts</button>
      </div>
    </>
  );
};

export default UserDetails;
