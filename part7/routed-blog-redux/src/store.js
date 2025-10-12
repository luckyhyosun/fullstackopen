import { configureStore } from '@reduxjs/toolkit'
import noteReducer, { initNotes } from './reducers/noteReducer'
import noteService from './services/notes'

const store = configureStore({
  reducer: noteReducer
})

noteService
  .getAll()
  .then(notes => store.dispatch(initNotes(notes)))

export default store
