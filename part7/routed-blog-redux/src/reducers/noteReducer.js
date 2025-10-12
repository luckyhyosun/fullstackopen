import { createSlice } from '@reduxjs/toolkit'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    addNote(state, action){
      const newNote = {
        id: Math.floor(Math.random()*100),
        content: action.payload,
        important: true
      }
      state.push(newNote)
    },
    initNotes(state, action){
      return action.payload
    }
  }
})

export const { addNote, initNotes } = noteSlice.actions
export default noteSlice.reducer
