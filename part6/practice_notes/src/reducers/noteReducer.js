import { createSlice, current } from '@reduxjs/toolkit'
import noteService from '../services/notes'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
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
    },
    appendNote(state, action){
      state.push(action.payload)
    }
  }
})

export const {  toggleImportanceOf, setNotes, appendNote } = noteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNote = (context) => {
  return async dispatch => {
    const newNote = await noteService.createNote(context)
    dispatch(appendNote(newNote))
  }
}

export default noteSlice.reducer
