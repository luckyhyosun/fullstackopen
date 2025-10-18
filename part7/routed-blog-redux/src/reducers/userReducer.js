import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
  name: 'user',
  initialState: { all: [], loggedInUser: null },
  reducers: {
    initUsers(state, action){
      state.all =  action.payload
    },
    setLoginUser(state, action){
      state.loggedInUser = action.payload
    },
    logoutUser(state, action){
      state.loggedInUser = action.payload
    },
    appendUser(state, action){
      state.all.push(action.payload)
    },
    changeUser(state, action){
      return state.all.map(user => user.id !== action.payload.id ? user : action.payload)
    }
  }
})

export const fetchUsers = () => {
  return async dispatch => {
    const users = await userService.allUser()
    dispatch(initUsers(users))
  }
}

export const loginCheck = (username, password) => {
  return async dispatch => {
    const allUsers = await userService.allUser()
    const foundUser = allUsers.find(user => user.username === username && user.password === password)
    if(!foundUser){
      return
    }
    dispatch(setLoginUser(foundUser))
  }
}

export const addUser = (username, password) => {
  return async dispatch => {
    const user = await userService.addUser(username, password)
    dispatch(setLoginUser(user))
    dispatch(appendUser(user))
  }
}

export const updateUser = (userId, noteObj) => {
  return async dispatch => {
    const updatedUser = await userService.updateUser(userId, noteObj)
    dispatch(changeUser(updatedUser))
  }
}

export const { initUsers, setLoginUser, logoutUser, appendUser, changeUser } = userSlice.actions
export default userSlice.reducer
