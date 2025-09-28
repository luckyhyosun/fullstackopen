import { useDispatch } from 'react-redux'
import { createAnecdot } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdot = (event) => {
    event.preventDefault()
    const content = event.target.newContent.value
    event.target.newContent.value = ''
    dispatch(createAnecdot(content))
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
