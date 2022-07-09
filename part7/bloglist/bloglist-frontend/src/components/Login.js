import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import loginServise from "../services/login";
import { errorNotification, unsetNotification } from "../reducers/notficationReducer";


const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedInUser = await loginServise.login(username, password);
      window.localStorage.setItem("user", JSON.stringify(loggedInUser));
      setUsername("");
      setPassword("");
      props.setUser(loggedInUser);
    } catch (exception) {
      const timeoutId = setTimeout(() => dispatch(unsetNotification()), 5000);
      dispatch(errorNotification({message: "wrong username or password", timeoutId}))      
    }
  };

  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin} id="loginForm">
        <label htmlFor="username">username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        <label htmlFor="password">password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <input type="submit" value="login" id="loginSubmit" />
      </form>
    </>
  );
};

export default Login;
