import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
  name: 'user',
  initialState: { all: [], loggedInUser: null },
  reducers: {
    initUsers(state, action){
      console.log(action.payload);
      state.all =  action.payload
    },
    setLoginUser(state, action){
      state.loggedInUser = action.payload
    },
    apendUser(state, action){
      state.all.push(action.payload)
    }
  }
})

export const fetchUsers = () => {
  return async dispatch => {
    const users = await userService.allUser()
    dispatch(initUsers(users))
  }
}

export const addUser = (username, password) => {
  return async dispatch => {
    const user = await userService.addUser(username, password)
    dispatch(setLoginUser(user))
    dispatch(apendUser(user))
  }
}

export const { initUsers, setLoginUser, apendUser } = userSlice.actions
export default userSlice.reducer
