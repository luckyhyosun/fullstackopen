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
    appendAnecdote(state, action){
      state.push(action.payload)
    }
  }
})

export const { setAnecdotes, voteClicked, appendAnecdote } = anecdoteSlice.actions

export const initializeStore = () => {
  return async function(dispatch) {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (newObj) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create(newObj)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVote = (id, updatedObj) => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.update(id, updatedObj)
    dispatch(voteClicked(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
