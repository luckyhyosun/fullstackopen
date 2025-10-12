import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setLoginUser(state, action){
      return action.payload
    }
  }
})

export const { setLoginUser } = userSlice.actions
export default userSlice.reducer
