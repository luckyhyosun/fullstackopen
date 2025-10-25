import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import blogService from '../services/blogs'
import loginService from '../services/login'

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

export const loginUser = ({username, password}) => {
  return async dispatch => {
    const user = await loginService.login({username, password})
    console.log(user);

    window.localStorage.setItem('blogAppToken', user.token)
    window.localStorage.setItem('blogAppUser', JSON.stringify({
      username: user.username,
      token: user.token
    }))

    blogService.setToken(user.token)

    dispatch(setLoggedInUser({username: user.username}))
  }
}

export const checkPersistantUser = () => {
  return async dispatch => {
    const loggedUser = JSON.parse(window.localStorage.getItem('blogAppUser'))
    console.log(loggedUser);

    if(loggedUser){
      blogService.setToken(loggedUser.token)
      dispatch(setLoggedInUser({username: loggedUser.username}))
    }
  }
}

export const { initUsers, setLoggedInUser } = userSlice.actions
export default userSlice.reducer
