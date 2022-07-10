import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllBlogs } from "./reducers/blogReducer";
import { loginUser, logoutUser } from "./reducers/userReducer";
import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateNewBlog from "./components/CreateNewBlog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";
import "./index.css";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogsBackend) => dispatch(setAllBlogs(blogsBackend)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      dispatch(loginUser(JSON.parse(loggedUserJSON)));
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("user");
    dispatch(logoutUser());
  };

  const createNewBlogRef = useRef();

  if (user === null)
    return (
      <>
        <Notification />
        <Login />
      </>
    );
  else
    return (
      <>
        <Notification />
        <h2>blogs</h2>
        <div>
          {user.name} is logged in <button onClick={logout}>log out</button>
        </div>
        <Togglable buttonLabel={"create new blog"} ref={createNewBlogRef}>
          <CreateNewBlog createNewBlogRef={createNewBlogRef} />
        </Togglable>
        <div id="blogs">
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </>
    );
};

export default App;
