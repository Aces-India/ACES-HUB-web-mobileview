import React, { createContext, useState } from "react";
export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [blogModal, setBlogModal] = useState(false);
  const [blogpageView, setBlogPageView] = useState(false);
  const [user, setUser] = useState({
    email: "",
  });
  const [email, setEmail] = useState();
  const [form, setForm] = useState();
  return (
    <GlobalContext.Provider
      value={{
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
