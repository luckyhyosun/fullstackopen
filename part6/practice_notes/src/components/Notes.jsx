import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateNote } from '../requests'

const Notes = ({ notes }) => {
  const queryClient = useQueryClient()
  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
  const toggleImportance = (note) => {
    updateNoteMutation.mutate({...note, important: !note.important })
  }

  return <ul>
  {notes.map(note=>
    <li key={note.id}>
      {note.content}
      <button onClick={() => toggleImportance(note)}>
        {note.important ? 'important' : 'Not important'}
      </button>
    </li>
  )}
  </ul>
}

export default Notes
