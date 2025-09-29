import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotification(state, action){
      const notification = action.payload
      return notification
    }
  }
})

export const { createNotification } = notificationSlice.actions
export default notificationSlice.reducer
