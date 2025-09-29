import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
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
      const content = action.payload
      state.push({
        content: content,
        id: getId(),
        votes: 0
      })
    }
  }
})

export const { voteClicked, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
