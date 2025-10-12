import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './reducers/noteReducer'
import notifiReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    users: userReducer,
    notes: noteReducer,
    notification: notifiReducer
  }
})

export default store
