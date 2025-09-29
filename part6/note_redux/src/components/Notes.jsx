import { useDispatch, useSelector } from "react-redux"
import { toggleImportanceOf } from '../reducers/noteReducer'
import noteService from '../services/notes'


const Note = ({ note, handleClick}) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(({notes, filter}) => {
    if(filter === 'ALL'){return notes}

    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  })

  const handleImportant = async (note) => {
    const updatedObj = {...note, important: !note.important}
    const response = await noteService.update(note.id, updatedObj)

    dispatch(toggleImportanceOf(response))
  }

  return (
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => handleImportant(note)
          }
        />
      )}
    </ul>
  )
}

export default Notes
