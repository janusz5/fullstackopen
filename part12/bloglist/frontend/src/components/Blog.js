import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Form, ListGroup } from "react-bootstrap";
import blogService from "../services/blogs";
import { removeBlog, updateBlog } from "../reducers/blogReducer";
import "./blog.css";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.user);
  const blogId = useParams().blogId;
  const blog = useSelector(
    (state) => state.blogs.filter((blog) => blog.id === blogId)[0]
  );
  if (!blog) return null;

  const likeBlog = async () => {
    let likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    const updatedBlog = await blogService.updateBlog(likedBlog, blog.id);
    dispatch(updateBlog({ blogId: blog.id, updatedBlog: updatedBlog }));
  };

  const deleteBlog = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      navigate("/");
      await blogService.deleteBlog(blog.id, user.token);
      dispatch(removeBlog(blog.id));
    }
  };

  const addComment = async (event) => {
    event.preventDefault();
    const updatedBlog = await blogService.addComment(blog.id, comment);
    dispatch(updateBlog({ blogId: blog.id, updatedBlog }));
    setComment("");
  };

  return (
    <div class="blogview">
      <h2>
        <span id="blogtitle">{blog.title}</span> by{" "}
        <span id="blogauthor">{blog.author}</span>
      </h2>
      <div id="blogurl">
        URL: <a href={blog.url}>{blog.url}</a>
      </div>
      <div id="bloglikes">
        Likes: {blog.likes} <Button onClick={() => likeBlog()}>like</Button>
      </div>
      <div id="blogadder">Added by: {blog.user.name}</div>
      {blog.user.username === user.username && (
        <div id="blogremover">
          <Button onClick={deleteBlog}>Remove</Button>
        </div>
      )}
      <h3>Comments</h3>
      <Form className="d-flex">
        <Form.Control
          type="text"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type="submit" onClick={addComment}>
          Add
        </Button>
      </Form>
      <ListGroup>
        {blog["comments"].map((comment) => (
          <ListGroup.Item key={comment}>{comment}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Blog;
