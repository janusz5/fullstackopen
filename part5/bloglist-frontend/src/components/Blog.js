import React, { useState } from 'react'

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>{buttonText}</button>
      </div>
      <div style={contentVisible}>
        <div>{blog.url}</div>
        <div>{blog.likes}</div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog