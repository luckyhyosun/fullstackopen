import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from '../services/anecdotes'

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

export const initializeStore = () => {
  return async function(dispatch) {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer
