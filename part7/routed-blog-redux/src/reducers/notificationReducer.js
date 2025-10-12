import { createSlice } from '@reduxjs/toolkit'

const notifiSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotification(state, action){
      return action.payload
    },
    resetNotification(state, action){
      return action.payload
    }
  }
})

export const resetNotiAction = () => {
  return async dispatch => {
    dispatch(resetNotification(''))
  }
}

export const { createNotification, resetNotification } = notifiSlice.actions
export default notifiSlice.reducer
