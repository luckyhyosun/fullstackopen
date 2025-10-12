import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './reducers/noteReducer'
import noteService from './services/notes'

const store = configureStore({
  reducer: noteReducer
})

noteService.getAll().then(notes => notes.forEach(note => {
  store.dispatch({type: 'ADD_NOTE', payload: note})

  console.log(store.getState())
}))

export default store
