import React from "react";
import { useState } from "react";
import loginServise from "../services/login"

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginServise.login(username, password)
      props.setUser(loggedInUser)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
    }
  }

  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <label for="username">username:</label>
        <input type="text" id="username" name="username" value={username} onChange={({ target }) => setUsername(target.value)} /><br />
        <label for="password">password:</label>
        <input type="password" id="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)} /><br />
        <input type="submit" value="login" />
      </form>
    </>
  )
}

export default Login