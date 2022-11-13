import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlide = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const message = action.payload.message
      const timeoutID = action.payload.timeoutID
      if(state !== null) clearTimeout(state.timeoutID)
      return {message, timeoutID}
    },
    unsetNotification(state, action) {
      return null
    }
  }
})

export const { setNotification, unsetNotification } = notificationSlide.actions
export default notificationSlide.reducer