import { createSlice, current } from '@reduxjs/toolkit'

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action){
      const content = action.payload
      state.push({
        content,
        imortant: false,
        id: generateId()
      })
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
