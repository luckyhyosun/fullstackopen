import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const Note = () => {
  const notes = useSelector(state => state.notes)

  const id = useParams().id
  const note = notes.find(n => n.id === id)

  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

export default Note
