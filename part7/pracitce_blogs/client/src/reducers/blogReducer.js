import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    initBlogs(state, action){
      return action.payload
    }
  }
})

export const fetchAllBlogs = () => {
  return async dispatch => {
      const blogs = await blogService.allBlogs()
      dispatch(initBlogs(blogs))
    }
}

export const { initBlogs } = blogSlice.actions
export default blogSlice.reducer
