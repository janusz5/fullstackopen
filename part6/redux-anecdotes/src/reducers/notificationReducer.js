import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlide = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const notification = action.payload
      return notification
    },
    unsetNotification(state, action) {
      return null
    }
  }
})

export const { setNotification, unsetNotification } = notificationSlide.actions
export default notificationSlide.reducer