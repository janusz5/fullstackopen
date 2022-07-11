import Togglable from "./Togglable";
import CreateNewBlog from "./CreateNewBlog";
import Blog from "./Blog";
import { useSelector } from "react-redux";
import { useRef } from "react";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const createNewBlogRef = useRef();
  return (
    <div>
      <Togglable buttonLabel={"create new blog"} ref={createNewBlogRef}>
        <CreateNewBlog createNewBlogRef={createNewBlogRef} />
      </Togglable>
      <div id="blogs">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
