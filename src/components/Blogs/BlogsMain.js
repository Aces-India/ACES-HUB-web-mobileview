import react, { useContext } from "react";
import Header from "../Header";
import UserDetails from "./UserDetails";
import Blogs from "./Blogs";
import { GlobalContext } from "../../GlobalProvider";
import WriteBlog from "./WriteBlog";
const BlogMain = () => {
  const { blogpageView, setBlogPageView } = useContext(GlobalContext);
  return (
    <>
      <Header />
      <div className="BlogMain">
        <UserDetails />
        <div>{blogpageView === "addBlog" ? <WriteBlog /> : <Blogs />}</div>
      </div>
    </>
  );
};
export default BlogMain;
