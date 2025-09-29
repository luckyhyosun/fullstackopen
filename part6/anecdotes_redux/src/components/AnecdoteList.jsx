import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(store => {
    return store.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(store.filter.toLowerCase()))
  })
  const dispatch = useDispatch()

  const vote = async (anecdote) => {
    const updatedObj = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    dispatch(updateVote(anecdote.id, updatedObj))
    dispatch(createNotification(`⬆️ ${updatedObj.content}⬆️ is voted!`, 10))
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )
  )
}

export default AnecdoteList
