import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    appendNote(state, action){
      return [...state, action.payload]
    },
    initNotes(state, action){
      return action.payload
    }
  }
})

export const fetchNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    console.log(notes);

    dispatch(initNotes(notes))
  }
}

export const addNote = (newNote) => {
  return async dispatch => {
    const newNoteRes = await noteService.addNote(newNote)
    dispatch(appendNote(newNoteRes))
  }
}

export const { appendNote, initNotes } = noteSlice.actions
export default noteSlice.reducer
