import { useSelector, useDispatch } from 'react-redux'
import { voteClicked } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  // the 'store' parameter can be either:
  // 'state' OR
  // {anecdotes, filter} which is distructured format
  const anecdotes = useSelector(store => {
    return store.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(store.filter.toLowerCase()))
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteClicked(id))
  }

  return(
    anecdotes
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )
  )
}

export default AnecdoteList
