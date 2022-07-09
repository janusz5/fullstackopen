import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    successNotification: (state, action) => {
      const message = action.payload.message;
      const timeoutId = action.payload.timeoutId;
      if (state !== null) clearTimeout(state.timeoutId);
      return { statusType: "success", message, timeoutId };
    },
    errorNotification: (state, action) => {
      const message = action.payload.message;
      const timeoutId = action.payload.timeoutId;
      if (state !== null) clearTimeout(state.timeoutId);
      return { statusType: "error", message, timeoutId };
    },
    unsetNotification: (state, action) => {
      return null;
    },
  },
});

export const { successNotification, errorNotification, unsetNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
