import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'

const store = configureStore({
  reducer:{
    users: userReducer,
    blogs: blogReducer
  }
})

export default store
