import { useSelector, useDispatch } from 'react-redux'
import { toggleImportanceOf} from '../reducers/noteReducer'

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes)

  const toggleImportance = id => {
    dispatch(toggleImportanceOf(id))
  }

  return <ul>
  {notes.map(note=>
    <li key={note.id}>
      {note.content}
      <button onClick={() => toggleImportance(note.id)}>
        {note.important ? 'important' : 'Not important'}
      </button>
    </li>
  )}
  </ul>
}

export default Notes
