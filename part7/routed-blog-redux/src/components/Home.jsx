import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { addNote } from '../reducers/noteReducer'
import { createNotification } from '../reducers/notificationReducer'
import { resetNotiAction } from '../reducers/notificationReducer'

const Home = () => {
  const [newNote, setNewNote] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addNewNotefnc = () => {
    console.log(newNote);

    dispatch(addNote(newNote))
    dispatch(createNotification(`Successfully Create New note: ${newNote}`))
    setTimeout(() => {dispatch(resetNotiAction())}, 2000)

    navigate('/notes')
  }

  return (
    <div>
    <h2>React-Redux Note app</h2>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

    <h2>Add new Note</h2>
    <input type="text" value={newNote} onChange={(e) => {setNewNote(e.target.value)}}/>
    <button onClick={addNewNotefnc}>submit</button>
  </div>
  )
}

export default Home
