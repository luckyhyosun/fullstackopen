import { useSelector, useDispatch } from 'react-redux'
import { toggleImportanceOf} from '../reducers/noteReducer'

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => {
    if(state.filter === 'ALL') return state.notes
    return state.filter === 'IMPORTANT'
    ? state.notes.filter(note => note.important)
    : state.notes.filter(note => !note.important)
  })

  return <ul>
  {notes.map(note=>
    <li key={note.id}>
      {note.content}
      <button onClick={() => dispatch(toggleImportanceOf(note.id))}>
        {note.important ? 'important' : 'Not important'}
      </button>
    </li>
  )}
  </ul>
}

export default Notes
