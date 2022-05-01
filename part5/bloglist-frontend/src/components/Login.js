import React from 'react'
import { useState } from 'react'
import loginServise from '../services/login'
import PropTypes from 'prop-types'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginServise.login(username, password)
      window.localStorage.setItem('user', JSON.stringify(loggedInUser))
      setUsername('')
      setPassword('')
      props.setUser(loggedInUser)
    }
    catch (exception) {
      props.setNotification({ statusType: 'error', message: 'wrong username or password' })
      setTimeout(() => props.setNotification(null), 5000)
    }
  }

  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin} id={'loginForm'}>
        <label htmlFor="username">username:</label>
        <input type="text" id="username" name="username" value={username} onChange={({ target }) => setUsername(target.value)} /><br />
        <label htmlFor="password">password:</label>
        <input type="password" id="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)} /><br />
        <input type="submit" value="login" />
      </form>
    </>
  )
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default Login