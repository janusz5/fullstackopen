import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllBlogs } from "./reducers/blogReducer";
import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateNewBlog from "./components/CreateNewBlog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";
import "./index.css";

const App = () => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogsBackend) => dispatch(setAllBlogs(blogsBackend)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  const createNewBlogRef = useRef();

  if (user === null)
    return (
      <>
        <Notification />
        <Login setUser={setUser} />
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
          <CreateNewBlog user={user} createNewBlogRef={createNewBlogRef} />
        </Togglable>
        <div id="blogs">
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </div>
      </>
    );
};

export default App;
