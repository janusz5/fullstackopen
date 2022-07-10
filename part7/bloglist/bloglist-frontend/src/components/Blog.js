import React, { useState } from "react";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { removeBlog, updateBlog } from "../reducers/blogReducer";

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const buttonText = visible ? "hide" : "view";
  let contentVisible = { display: visible ? "" : "none" };

  const likeBlog = async () => {
    let newBlog = { ...blog };
    newBlog.likes += 1;
    newBlog.user = blog.user.id;
    const updatedBlog = await blogService.updateBlog(newBlog, blog.id);
    dispatch(updateBlog({ blogId: blog.id, updatedBlog: updatedBlog }));
  };

  const removeButtonHandler = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id, user.token);
      dispatch(removeBlog(blog.id));
    }
  };

  const getDeleteButton = () => {
    if (blog.user.username === user.username) {
      return (
        <div>
          <button onClick={removeButtonHandler}>remove</button>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div style={blogStyle} className={"blog"}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setVisible(!visible)}>{buttonText}</button>
      </div>
      <div style={contentVisible} className={"hiddenContent"}>
        <div>{blog.url}</div>
        <div>
          {blog.likes} <button onClick={() => likeBlog()}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {getDeleteButton()}
      </div>
    </div>
  );
};

export default Blog;
