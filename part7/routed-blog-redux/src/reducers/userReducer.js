import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setLoginUser(state, action){
      return action.payload
    }
  }
})

export const addUser = (username) => {
  return async dispatch => {
    const user = await userService.addUser(username)
    dispatch(setLoginUser(user))
  }
}

export const { initUser, setLoginUser } = userSlice.actions
export default userSlice.reducer
