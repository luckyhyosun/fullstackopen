import { useSelector, useDispatch } from 'react-redux'
import { voteClicked } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'

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

    const updatedAnecdote = await anecdotesService.update(anecdote.id, updatedObj)
    console.log(updatedAnecdote);

    dispatch(voteClicked(updatedAnecdote))
    dispatch(createNotification(`⬆️ ${updatedAnecdote.content}⬆️ is voted!`))
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
