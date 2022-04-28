import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'

const CreateNewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlogHandler = async (event) => {
    event.preventDefault()
    const createdBog = await blogService.createBlog(title, author, url, props.user.token)
    setTitle('')
    setAuthor('')
    setUrl('')
    props.createNewBlogRef.current.toggleVisibility()
    props.setBlogs(props.blogs.concat(createdBog))
    props.setNotification({ statusType: 'success', message: `added a new blog ${createdBog.title} by ${createdBog.author}` })
    setTimeout(() => props.setNotification(null), 5000)
  }

  return (
    <>
      <h2>create new blog</h2>
      <form onSubmit={createBlogHandler}>
        <label htmlFor="title">title:</label>
        <input type="text" id="title" name="title" value={title} onChange={({ target }) => setTitle(target.value)}/><br/>
        <label htmlFor="author">author:</label>
        <input type="text" id="author" name="author" value={author} onChange={({ target }) => setAuthor(target.value)}/><br/>
        <label htmlFor="url">url:</label>
        <input type="text" id="url" name="url" value={url} onChange={({ target }) => setUrl(target.value)}/><br/>
        <input type="submit" value="create" id="submitButton"/>
      </form>
    </>
  )
}

export default CreateNewBlog