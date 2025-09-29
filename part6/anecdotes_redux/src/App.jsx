import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

import anecdotesService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  const getId = () => (100000 * Math.random()).toFixed(0)

  const asObject = (anecdote) => {
    return {
      ...anecdote,
      votes: 0,
      id: getId()
    }
  }

  useEffect(() => {
    anecdotesService
      .getAll()
      .then(anecdotes => {
        const setInitialAnecdotes = anecdotes.map(asObject)
        console.log(setInitialAnecdotes);

        dispatch(setAnecdotes(setInitialAnecdotes))
      })
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
