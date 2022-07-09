import { createSlice } from "@reduxjs/toolkit";

const sortBlogs = (blogs) =>
  blogs.sort((blog1, blog2) => blog1.likes < blog2.likes);

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
  },
});

export const { setAllBlogs, addBlog } = blogSlice.actions;
export default blogSlice.reducer;
