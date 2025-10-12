import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './reducers/noteReducer'

const store = configureStore({
  reducer: noteReducer
})

export default store
