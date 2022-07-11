import { useSelector } from "react-redux";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Togglable from "./Togglable";
import CreateNewBlog from "./CreateNewBlog";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const createNewBlogRef = useRef();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <Togglable buttonLabel={"create new blog"} ref={createNewBlogRef}>
        <CreateNewBlog createNewBlogRef={createNewBlogRef} />
      </Togglable>
      <div id="blogs">
        {blogs.map((blog) => (
          <div key={blog.id} style={blogStyle} className={"blog"}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
