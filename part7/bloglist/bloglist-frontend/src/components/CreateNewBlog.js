import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import blogService from "../services/blogs";
import {
  successNotification,
  unsetNotification,
} from "../reducers/notficationReducer";
import { addBlog } from "../reducers/blogReducer";

const CreateNewBlog = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const user = useSelector((state) => state.user);

  const createBlogHandler = async (event) => {
    event.preventDefault();
    const createdBlog = await blogService.createBlog(
      title,
      author,
      url,
      user.token
    );
    dispatch(addBlog(createdBlog));
    const timeoutId = setTimeout(() => dispatch(unsetNotification()), 5000);
    dispatch(
      successNotification({
        message: `added a new blog ${createdBlog.title} by ${createdBlog.author}`,
        timeoutId,
      })
    );
    props.createNewBlogRef.current.toggleVisibility();
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>Create New Blog</h2>
      <Form onSubmit={createBlogHandler} style={{ paddingBottom: 7 }}>
        <Form.Group>
          <Form.Label htmlFor="title">Title:</Form.Label>
          <Form.Control
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="author">Author:</Form.Label>
          <Form.Control
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="url">URL:</Form.Label>
          <Form.Control
            type="text"
            id="url"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button type="submit" id="submitButton">
          Create
        </Button>
      </Form>
    </>
  );
};

export default CreateNewBlog;
