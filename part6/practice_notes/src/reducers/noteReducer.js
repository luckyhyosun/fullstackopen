import { createSlice, current } from '@reduxjs/toolkit'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action){
      state.push(action.payload)
    },
    toggleImportanceOf(state, action){
      const id = action.payload
      const foundNote = state.find(note => note.id === id)
      const updatedNote = {...foundNote, important: !foundNote.important}
      console.log(current(state));

      return state.map(note => note.id !== id
        ? note
        : updatedNote
      )
    },
    setNotes(state, action){
      return action.payload
    }
  }
})

export const { createNote, toggleImportanceOf, setNotes } = noteSlice.actions
export default noteSlice.reducer
