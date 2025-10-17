import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'
import userSevice from '../services/user'
import { changeUser } from '../reducers/userReducer'

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

export const addNote = (isUserLoggedIn, newNote) => {
  if(!isUserLoggedIn) return

  return async dispatch => {
  const addedNote = await noteService.addNote(isUserLoggedIn.id, newNote)
  console.log(addedNote);
  dispatch(appendNote(addedNote))

  const updatedUser = await userSevice.updateUser(isUserLoggedIn.id, addedNote)
  dispatch(changeUser(updatedUser))
  }
}

export const updateNote = (userId, noteObj) => {
  return async dispatch => {
    const updatedNote = await noteService.updateNote(userId, noteObj)
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
