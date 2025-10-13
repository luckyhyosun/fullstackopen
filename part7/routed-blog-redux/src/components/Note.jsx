import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { updateNote, deleteNote } from '../reducers/noteReducer'
import { useNavigate } from "react-router-dom"

const Note = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const notes = useSelector(state => state.notes)

  const id = useParams().id
  const note = notes.find(n => n.id === id)

  const handleLikeBtn = () => {
    dispatch(updateNote(note))
  }

  const handleDeleteBtn = () => {
    dispatch(deleteNote(note))
    navigate('/notes')
  }

  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <p>Likes: {note.likes? note.likes: 0}</p>
      <button onClick={handleLikeBtn}>Like: 👍</button>
      <button onClick={handleDeleteBtn}>Delete: ❌</button>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

export default Note
