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
    },
    setLogoutUser(state, action){
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

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('blogAppUser')
    blogService.setToken(null)
    dispatch(setLogoutUser(null))
  }
}

export const { initUsers, setLoggedInUser, setLogoutUser } = userSlice.actions
export default userSlice.reducer
