import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '../requests'

const NewNote = () => {
  const queryClient = useQueryClient()
  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      //optimizing the performance
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(newNote))
    }
  })

  const addNote = async event => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''

    newNoteMutation.mutate({ content, important: true })
  }

  return <form onSubmit={addNote}>
    <input name="note" />
    <button type="submit">add</button>
  </form>
}

export default NewNote
