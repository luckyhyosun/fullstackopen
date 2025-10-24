import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'user',
  initialState: {allUsers:[], loggedInUser: null},
  reducers: {
    initUsers(state, action){
      state.allUsers = action.payload
    },
    setLoggedInUser(state, action){
      state.loggedInUser = action.payload
    }
  }
})

export const fetchAllUser = () => {
  return async dispatch => {
    const allUsers = await userService.allUsers()
    const allUsersArray = allUsers.map(user => ({
      username: user.username,
      id: user.id
    }))
    dispatch(initUsers(allUsersArray))
  }
}

export const setUserLoggedIn = (username) => {
  return async dispatch => {
    const allUsers = await userService.allUsers()
    const foundUser = allUsers.find(user => user.username === username) || null
    dispatch(setLoggedInUser(foundUser))
  }
}

export const { initUsers, setLoggedInUser } = userSlice.actions
export default userSlice.reducer
