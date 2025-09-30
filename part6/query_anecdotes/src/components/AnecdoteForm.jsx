import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotifiDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const notificationDispatch = useNotifiDispatch()

  const queryClient = useQueryClient()

  const newAnecMutation = useMutation({
    mutationFn: (newAnecdote) => {
    if (newAnecdote.content.length < 5) {
      return Promise.reject(new Error('Too short text, it should be more than 5 characters'))
    }
    return createAnecdote(newAnecdote)
  },
    onSuccess: (response) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes']), anecdotes.concat(response)
    },
    onError: (error) => {
      notificationDispatch({ type: 'ERROR', payload: error.message })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecMutation.mutate({content})
    notificationDispatch({ type: 'ADD', payload: content})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
