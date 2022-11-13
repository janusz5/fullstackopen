import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (title, author, url, token) => {
  const headers = {
    Authorization: `bearer ${token}`,
  };
  const response = await axios.post(
    baseUrl,
    { title, author, url },
    { headers: headers }
  );
  return response.data;
};

const updateBlog = async (blog, blogId) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, blog);
  return response.data;
};

const deleteBlog = async (blogId, token) => {
  const headers = {
    Authorization: `bearer ${token}`,
  };
  await axios.delete(`${baseUrl}/${blogId}`, { headers: headers });
};

const addComment = async (blogId, comment) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, {
    comment: comment,
  });
  return response.data;
};

const blogService = { getAll, createBlog, updateBlog, deleteBlog, addComment };
export default blogService;
