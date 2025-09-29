import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    setAnecdotes(state, action){
      return action.payload
    },
    voteClicked(state, action){
      const id = action.payload
      const foundAnecdote = state.find(anecdote => anecdote.id === id)

      const updatedAnecdote = {
        ...foundAnecdote,
        votes: foundAnecdote.votes + 1
      }

      return state.map(anecdote => anecdote.id !== id
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
