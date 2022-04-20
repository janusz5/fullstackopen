import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateNewBlog from './components/CreateNewBlog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

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
    return (
      <>
        <Notification notification={notification} />
        <Login setUser={setUser} setNotification={setNotification} />
      </>
    )
  else
    return (
      <>
        <Notification notification={notification} />
        <h2>blogs</h2>
        <div>{user.name} is logged in <button onClick={logout}>log out</button></div>
        <CreateNewBlog user={user} blogs={blogs} setBlogs={setBlogs} setNotification={setNotification}/>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </>
    )
}

export default App