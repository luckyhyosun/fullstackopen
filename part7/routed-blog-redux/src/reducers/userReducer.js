import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    showLoginUser(state, action){
      return action.payload
    }
  }
})

export const setLoginUser = (username) => {
  console.log(username);

  return async dispatch => {
    const user = await userService.postUser(username)
    dispatch(showLoginUser(user))
  }
}

export const { showLoginUser } = userSlice.actions
export default userSlice.reducer
