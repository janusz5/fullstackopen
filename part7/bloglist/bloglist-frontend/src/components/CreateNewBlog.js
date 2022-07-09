import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import {
  successNotification,
  unsetNotification,
} from "../reducers/notficationReducer";
import { addBlog } from "../reducers/blogReducer";

const CreateNewBlog = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const createBlogHandler = async (event) => {
    event.preventDefault();
    const createdBlog = await blogService.createBlog(
      title,
      author,
      url,
      props.user.token
    );
    setTitle("");
    setAuthor("");
    setUrl("");
    props.createNewBlogRef.current.toggleVisibility();
    dispatch(addBlog(createdBlog))
    const timeoutId = setTimeout(() => dispatch(unsetNotification()), 5000);
    dispatch(
      successNotification({
        message: `added a new blog ${createdBlog.title} by ${createdBlog.author}`,
        timeoutId,
      })
    );
  };

  return (
    <>
      <h2>create new blog</h2>
      <form onSubmit={createBlogHandler}>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        <label htmlFor="author">author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        <label htmlFor="url">url:</label>
        <input
          type="text"
          id="url"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <input type="submit" value="create" id="submitButton" />
      </form>
    </>
  );
};

export default CreateNewBlog;
