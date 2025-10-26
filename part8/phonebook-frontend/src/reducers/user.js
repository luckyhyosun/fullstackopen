import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    intiUsers(state, action){
      return action.payload
    }
  }
})

export const fetchAllUsers = () => {
  return async dispatch => {
    const allUsers = await userService.allUsers()
    dispatch(intiUsers(allUsers))
  }
}

export const { intiUsers } = userSlice.actions
export default userSlice.reducer
