import { createSlice } from "@reduxjs/toolkit";

const sortBlogs = (blogs) =>
  blogs.sort((blog1, blog2) => blog2.likes - blog1.likes);

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setAllBlogs(state, action) {
      return sortBlogs(action.payload);
    },
    addBlog(state, action) {
      return sortBlogs(state.concat(action.payload));
    },
    removeBlog(state, action) {
      const deleteBlogId = action.payload;
      return sortBlogs(state.filter((blog) => blog.id !== deleteBlogId));
    },
    updateBlog(state, action) {
      const blogId = action.payload.blogId;
      const updatedBlog = action.payload.updatedBlog;
      return sortBlogs(
        state.map((blog) => (blog.id === blogId ? updatedBlog : blog))
      );
    },
  },
});

export const { setAllBlogs, addBlog, removeBlog, updateBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
