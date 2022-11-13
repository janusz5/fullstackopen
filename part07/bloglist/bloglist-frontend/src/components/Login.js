import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import loginServise from "../services/login";
import {
  errorNotification,
  unsetNotification,
} from "../reducers/notficationReducer";
import { loginUser } from "../reducers/userReducer";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedInUser = await loginServise.login(username, password);
      dispatch(loginUser(loggedInUser));
      setUsername("");
      setPassword("");
    } catch (exception) {
      const timeoutId = setTimeout(() => dispatch(unsetNotification()), 5000);
      dispatch(
        errorNotification({ message: "wrong username or password", timeoutId })
      );
    }
  };

  return (
    <>
      <h2>Log In To Application</h2>
      <Form onSubmit={handleLogin} id="loginForm">
        <Form.Group>
          <Form.Label htmlFor="username">Username:</Form.Label>
          <Form.Control
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password:</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button type="submit" id="loginSubmit">
          Login
        </Button>
      </Form>
    </>
  );
};

export default Login;
