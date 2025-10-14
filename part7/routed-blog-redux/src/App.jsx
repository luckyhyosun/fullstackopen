import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Home from './components/Home'
import Note from './components/Note'
import Notes from './components/Notes'
import User from './components/User'
import Login from './components/Login'
import Footer from './components/Footer'
import Notification from './components/Notification'
import { fetchNotes } from './reducers/noteReducer'
import { fetchUsers } from './reducers/userReducer'

import {
  Routes,
  Route,
  Link,
} from "react-router-dom"


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchNotes())
    dispatch(fetchUsers())
  }, [fetchNotes, fetchUsers])

  const padding = {
    padding: 5
  }

  return (
    <div className="container">
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/notes">notes</Link>
      <Link style={padding} to="/user">user</Link>
      <Link style={padding} to="/login">login</Link>
      <Notification />
      <Routes>
        <Route path="/notes/:id" element={<Note />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
