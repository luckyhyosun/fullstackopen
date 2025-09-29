import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification (state, action){
      return action.payload
    },
    clearNotification(state, action) {
      return action.payload
    }
  }
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const createNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(clearNotification(''))
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer
