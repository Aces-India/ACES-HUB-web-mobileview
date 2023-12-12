import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Awards from "./components/Awards";
import Dates from "./components/Dates";
import Events from "./components/Events";
import Rules from "./components/Rules";
import Tracks from "./components/Tracks";
import BlogMain from "./components/Blogs/BlogsMain";
import WriteBlog from "./components/Blogs/WriteBlog";
import Main from "./components/Main";
import Dashboard from "./components/Admin/Dashboard/dashboard";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/Awards" element={<Awards />} />
      <Route path="/Dates" element={<Dates />} />
      <Route path="/Events" element={<Events />} />
      <Route path="/Rules" element={<Rules />} />
      <Route path="/Tracks" element={<Tracks />} />
      <Route path="/Blogs" element={<BlogMain />} />
      <Route path="/newBlog" element={<WriteBlog />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Home" element={<Home />} />
      <Route exact path="/Blogs/:blog" element={<BlogMain />} />
    </Routes>
  );
}

export default App;
