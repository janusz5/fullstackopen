import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notficationReducer";
import blogReducer from "./reducers/blogReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
  },
});

export default store;
