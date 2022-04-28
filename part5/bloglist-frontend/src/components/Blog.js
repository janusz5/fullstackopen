import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonText = visible ? 'hide' : 'view'
  let contentVisible = { display: visible ? '' : 'none' }

  const removeButtonHandler = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  const getDeleteButton = () => {
    if (blog.user.username === user.username) {
      return (<div><button onClick={removeButtonHandler}>remove</button></div>)
    }
    else {
      return (<></>)
    }
  }

  return (
    <div style={blogStyle} className={'blog'}>
      <div>
        {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>{buttonText}</button>
      </div>
      <div style={contentVisible} className={'hiddenContent'}>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={() => likeBlog(blog.id)}>like</button></div>
        <div>{blog.user.name}</div>
        {getDeleteButton()}
      </div>
    </div>
  )
}

export default Blog