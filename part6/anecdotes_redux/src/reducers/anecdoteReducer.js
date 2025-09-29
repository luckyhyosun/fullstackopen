import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    setAnecdotes(state, action){
      return action.payload
    },
    voteClicked(state, action){
      const updatedAnecdote = action.payload

      return state.map(anecdote => anecdote.id !== updatedAnecdote.id
        ? anecdote
        : updatedAnecdote
      )
    },
    createAnecdote(state, action){
      state.push(action.payload)
    }
  }
})

export const { setAnecdotes, voteClicked, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
