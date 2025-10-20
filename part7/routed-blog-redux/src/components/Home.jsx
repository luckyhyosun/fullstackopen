import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { addNote } from '../reducers/noteReducer'
import { createNotification } from '../reducers/notificationReducer'
import { resetNotiAction } from '../reducers/notificationReducer'
import Users from './Users'
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Home = () => {
  const [newNote, setNewNote] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isUserLoggedIn = useSelector(state => state.users.loggedInUser)

  const addNewNotefnc = () => {
    dispatch(addNote(isUserLoggedIn, newNote))
    dispatch(createNotification(`Successfully Create New note: ${newNote}`))
    setTimeout(() => {dispatch(resetNotiAction())}, 2000)

    navigate('/notes')
  }

  return (
    <div>
    <h2>React-Redux Note app</h2>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

    {!isUserLoggedIn
      ? <h2>❗️ Please Login to Add a note 👋</h2>
      : (
        <div>
          <h2>Add new Note</h2>
          <input type="text" value={newNote} onChange={(e) => {setNewNote(e.target.value)}}/>
          <Button onClick={addNewNotefnc}>submit</Button>
        </div>
      )
    }

    <Users />
  </div>
  )
}

export default Home
