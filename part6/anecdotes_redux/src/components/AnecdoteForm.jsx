import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdot = async (event) => {
    event.preventDefault()
    const content = event.target.newContent.value
    event.target.newContent.value = ''

    const newObj = {
      content: content,
      votes: 0
    }

    dispatch(createAnecdote(newObj))
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
