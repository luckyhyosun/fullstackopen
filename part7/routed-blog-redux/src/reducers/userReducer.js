import { createSlice, current } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    initUser(state, action){
      return action.payload
    },
    setLoginUser(state, action){
      const foundUser = state.find(user => user.username === action.payload)
      return foundUser
    }
  }
})

export const initilaizeUser = () => {
  return async dispatch => {
    const user = await userService.allUsers()
    dispatch(initUser(user))
  }
}

export const { initUser, setLoginUser } = userSlice.actions
export default userSlice.reducer
