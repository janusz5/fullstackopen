import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import blogService from "../services/blogs";
import { removeBlog, updateBlog } from "../reducers/blogReducer";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const blogId = useParams().blogId;
  const blogs = useSelector((state) => state.blogs);
  if (blogs.length === 0) return null;
  const blog = blogs.filter((blog) => blog.id === blogId)[0];

  const likeBlog = async () => {
    let newBlog = { ...blog };
    newBlog.likes += 1;
    newBlog.user = blog.user.id;
    const updatedBlog = await blogService.updateBlog(newBlog, blog.id);
    dispatch(updateBlog({ blogId: blog.id, updatedBlog: updatedBlog }));
  };

  const deleteBlog = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      navigate("/");
      await blogService.deleteBlog(blog.id, user.token);
      dispatch(removeBlog(blog.id));
    }
  };

  return (
    <div>
      <h2>
        '{blog.title}' by '{blog.author}'
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} <button onClick={() => likeBlog()}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {blog.user.username === user.username && (
        <div>
          <button onClick={deleteBlog}>remove</button>
        </div>
      )}
      <h3>comments</h3>
      <ul>
        {blog["comments"].map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
