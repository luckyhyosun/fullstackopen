import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { updateNote } from '../reducers/noteReducer'

const Note = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes)

  const id = useParams().id
  const note = notes.find(n => n.id === id)

  const handleLikeBtn = () => {
    dispatch(updateNote(note))
  }

  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <p>Likes: {note.likes? note.likes: 0}</p>
      <button onClick={handleLikeBtn}>Like: 👍</button>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

export default Note
