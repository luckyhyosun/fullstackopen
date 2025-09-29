import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
    },
    toggleImportanceOf(state, action) {
      const changedNote = action.payload

      console.log(changedNote)

      return state.map(note =>
        note.id !== action.payload.id ? note : changedNote
      )
    },
    setNotes(state, action) {
      return action.payload
    }
  },
})
export const {createNote,toggleImportanceOf, setNotes } = noteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export default noteSlice.reducer
