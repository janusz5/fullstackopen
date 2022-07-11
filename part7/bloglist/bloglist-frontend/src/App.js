import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllBlogs } from "./reducers/blogReducer";
import { setAllUsers } from "./reducers/usersReducer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import blogService from "./services/blogs";
import usersService from "./services/users";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Users from "./components/Users";
import "./index.css";
import User from "./components/User";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogsBackend) => dispatch(setAllBlogs(blogsBackend)));
    usersService
      .getUsers()
      .then((usersBackend) => dispatch(setAllUsers(usersBackend)));
  }, []); // eslint-disable-line

  if (user === null)
    return (
      <>
        <Notification />
        <Login />
      </>
    );
  else
    return (
      <BrowserRouter>
        <Notification />
        <Header />
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/blogs/:blogId" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    );
};

export default App;
