import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdot = (event) => {
    event.preventDefault()
    const content = event.target.newContent.value
    event.target.newContent.value = ''
    dispatch(createAnecdote(content))
    dispatch(createNotification(`📝 ${content} 📝 is created!`))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdot}>
        <div><input name="newContent"/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
