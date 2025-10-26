import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    intiUsers(state, action){
      return action.payload
    },
    appendUser(state, action){
      return [...state, action.payload]
    }
  }
})

export const fetchAllUsers = () => {
  return async dispatch => {
    const allUsers = await userService.allUsers()
    dispatch(intiUsers(allUsers))
  }
}

export const addUser = ({username, contact}) => {
  return async dispatch => {
    const newUser = await userService.addUser({username, contact})
    dispatch(appendUser(newUser))
  }
}

export const { intiUsers, appendUser } = userSlice.actions
export default userSlice.reducer
