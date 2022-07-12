import { useSelector } from "react-redux";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import Togglable from "./Togglable";
import CreateNewBlog from "./CreateNewBlog";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const createNewBlogRef = useRef();

  return (
    <div>
      <Togglable buttonLabel={"Create New Blog"} ref={createNewBlogRef}>
        <CreateNewBlog createNewBlogRef={createNewBlogRef} />
      </Togglable>
      <ListGroup id="blogs">
        {blogs.map((blog) => (
          <ListGroup.Item key={blog.id} className={"blog"}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Blogs;
