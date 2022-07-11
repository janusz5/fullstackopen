import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const loggedInUserJSON = JSON.parse(window.localStorage.getItem("user"));
  return loggedInUserJSON
};

const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    loginUser(state, action) {
      const user = action.payload;
      window.localStorage.setItem("user", JSON.stringify(user));
      return user;
    },
    logoutUser(state, action) {
      window.localStorage.removeItem("user");
      return null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
