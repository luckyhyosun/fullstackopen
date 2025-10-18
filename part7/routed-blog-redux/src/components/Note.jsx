import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { updateNote, deleteNote } from '../reducers/noteReducer'
import { useNavigate } from "react-router-dom"

const Note = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const notes = useSelector(state => state.notes)
  const loggedInUser = useSelector(state => state.users.loggedInUser)

  const id = useParams().id
  const note = notes.find(n => n.id === id)

  const handleLikeBtn = () => {
    dispatch(updateNote(note))
  }

  const handleDeleteBtn = () => {
    dispatch(deleteNote(note))
    navigate('/notes')
  }

  if(!note){
    navigate('/')
    return
  }

  return (
    <div>
      <h2>📝 {note.content}</h2>
      <div>Importance: {note.important ? 'Yes' : 'No'}</div>
      <p>Likes: {note.likes}
        <button style={{"marginLeft":"20px", "border":"none"}}onClick={handleLikeBtn}>up👍</button>
      </p>
      {note.user.id === loggedInUser?.id && (
        <button onClick={handleDeleteBtn} style={{"marginTop":"30px", "marginBottom":"30px", "border":"none" , "padding": "5px"}}>
          delete❌
        </button>
      )}
    </div>
  )
}

export default Note
