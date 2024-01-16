import { useContext } from "react";
import { GlobalContext } from "../../GlobalProvider";
import Modal from "react-modal";
import axios from "axios";
import Api from "../../api";
const CommentModal = () => {
  const { commentModal, setCommentModal, setTitle, setBody, comments } =
    useContext(GlobalContext);
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("first");
    const commentData = {
      user_id: "userId",
      comnt_msg: "test ccomment by same",
      user_email: "mser.dev@gmail.com",
    };
    Api.post("post/65775caad4405493f62699c0/comment", commentData)
      .then((res) => console.log(res.data));
  };
  const closeModal = () => {
    console.log("first");
    setCommentModal(false);
  };
  console.log(comments, "comments");
  return (
    <>
      <Modal
        isOpen={commentModal}
        className="modalStyles"
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div className="modalTitle">
          <h4 className="modalHeader">Comments</h4>
          <button className="modalButton" onClick={closeModal}>
            X
          </button>
        </div>
        {comments?.reverse().map((comment, index) => (
          <div
            key={index}
            style={{
              width: "90%",
              margin: "10px",
              height: "auto",
              border: "1px solid black",
            }}
          >
            {comment.user_email}
            <br></br>
            <hr></hr>
            {comment.comment_msg}
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="formInput"
            placeholder="title"
            style={{ width: "90%", margin: "10px", height: "40px" }}
          />

          <button className="button" style={{ marginBottom: "400px" }}>
            Add Comment
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CommentModal;
