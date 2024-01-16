import react, { useContext } from "react";
import Header from "../Header";
import UserDetails from "./UserDetails";
import Blogs from "./Blogs";
import { GlobalContext } from "../../GlobalProvider";
import WriteBlog from "./WriteBlog";
import Blogdisplay from "./Blogdisplay";
const BlogMain = () => {
  const { blogpageView, setBlogPageView } = useContext(GlobalContext);
  return (
    <div style={{backgroundColor:"#f4f4f8"}}>
      <Header />
      <div className="BlogMain">
        <UserDetails />
        <div>
          {blogpageView === "addBlog" ? (
            <WriteBlog />
          ) : blogpageView === "blogdisplay" ? (
            <Blogdisplay />
          ) : (
            <Blogs />
          )}
        </div>
      </div>
    </div>
  );
};
export default BlogMain;
