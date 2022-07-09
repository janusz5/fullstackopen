import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notficationReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer
  }
})

export default store