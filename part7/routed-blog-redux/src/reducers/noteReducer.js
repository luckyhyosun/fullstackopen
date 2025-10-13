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
    },
    modifyNote(state, action){
      const updatedNotes = state.map(note => note.id === action.payload.id ? action.payload : note)
      return updatedNotes
    },
    removeNote(state, action){
      return state.filter(note => note.id !== action.payload.id)
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

export const updateNote = (noteObj) => {
  return async dispatch => {
    const updatedNote = await noteService.updateNote(noteObj)
    dispatch(modifyNote(updatedNote))
  }
}

export const deleteNote = (noteObj) => {
  return async dispatch => {
    const deltedNote = await noteService.deleteNote(noteObj)
    dispatch(removeNote(deltedNote))
  }
}

export const { appendNote, initNotes, modifyNote, removeNote } = noteSlice.actions
export default noteSlice.reducer
