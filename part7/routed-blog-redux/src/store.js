import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './reducers/noteReducer'
import notifiReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    notification: notifiReducer
  }
})

export default store
