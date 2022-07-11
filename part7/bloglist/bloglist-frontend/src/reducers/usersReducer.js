import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      const users = action.payload;
      return users;
    }
  },
});

export const { setAllUsers } = usersSlice.actions;
export default usersSlice.reducer;
