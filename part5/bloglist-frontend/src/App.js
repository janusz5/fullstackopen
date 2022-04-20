import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  if (user === null)
    return <Login setUser={setUser} />
  else
    return (
      <>
        <h2>blogs</h2>
        <div>{user.name} is logged in <button onClick={logout}>log out</button></div> 
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </>
    )
}

export default App