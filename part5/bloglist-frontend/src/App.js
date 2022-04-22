import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateNewBlog from './components/CreateNewBlog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import './index.css'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((blog1, blog2) => blog1.likes <= blog2.likes))
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

  const likeBlog = async (blogId) => {
    const newBlog = blogs.filter(blog => blog.id === blogId)[0]
    newBlog.likes += 1
    newBlog.user = newBlog.user.id
    const updatedBlog = await blogService.updateBlog(newBlog, blogId)
    setBlogs(
      blogs.map(blog => blog.id === blogId ? updatedBlog : blog)
        .sort((blog1, blog2) => blog1.likes <= blog2.likes)
    )
  }

  const createNewBlogRef = useRef()


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
        <Togglable buttonLabel={'create new blog'} ref={createNewBlogRef}>
          <CreateNewBlog user={user} blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} createNewBlogRef={createNewBlogRef} />
        </Togglable>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />)}
      </>
    )
}

export default App