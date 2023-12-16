import React, { createContext, useState } from "react";
export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [blogModal, setBlogModal] = useState(false);
  const [blogpageView, setBlogPageView] = useState(false);
  const [user, setUser] = useState({
    email: "",
  });
  const [email, setEmail] = useState();
  const [userName, setUSerName] = useState();
  const [userId, setUserId] = useState();
  const [form, setForm] = useState();
  const [posts, setPosts] = useState();
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [textareaValue, setTextareaValue] = useState("");
  const [commentModal, setCommentModal] = useState(false);
  const [comments, setComments] = useState();
  const [postDisplay, setPostDisplay] = useState();
  const [loggedInUserDetails, setLoggedInUserDetails] = useState();
  return (
    <GlobalContext.Provider
      value={{
        loggedInUserDetails,
        setLoggedInUserDetails,
        postDisplay,
        setPostDisplay,
        comments,
        setComments,
        commentModal,
        setCommentModal,
        selectedImage,
        setSelectedImage,
        textareaValue,
        setTextareaValue,
        title,
        setTitle,
        userId,
        setUserId,
        userName,
        setUSerName,
        blogModal,
        setBlogModal,
        blogpageView,
        setBlogPageView,
        email,
        setEmail,
        user,
        setUser,
        form,
        setForm,
        posts,
        setPosts,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
