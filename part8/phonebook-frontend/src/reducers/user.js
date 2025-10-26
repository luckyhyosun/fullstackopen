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
    },
    removeUser(state, action){
      return state.filter(user => user.id !== action.payload.id)
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

export const deleteUser = (id) => {
  return async dispatch => {
    const deletedUser = await userService.deleteUser(id)
    dispatch(removeUser(deletedUser))
  }
}

export const { intiUsers, appendUser, removeUser } = userSlice.actions
export default userSlice.reducer
