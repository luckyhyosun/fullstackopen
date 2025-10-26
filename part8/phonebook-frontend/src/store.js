import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notification'
import userSlice from './reducers/user'

const store = configureStore({
  reducer: {
    users: userSlice,
    notification:notificationReducer
  }
})

export default store
