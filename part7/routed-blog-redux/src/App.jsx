import { useState, useEffect } from 'react'

import Home from './components/Home'
import Note from './components/Note'
import Notes from './components/Notes'
import Users from './components/Users'
import Login from './components/Login'
import Footer from './components/Footer'
import noteService from './services/notes'

import {
  Routes,
  Route,
  Link,
  Navigate,
  useMatch,
} from "react-router-dom"

const App = () => {
  const [notes, setNotes] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    noteService.getAll().then(notes => {
      setNotes(notes)
    })
  }, [])

  const login = (user) => {
    setUser(user)
    setMessage(`welcom, ${user} !`)
    setTimeout(() => {
      setMessage(null)
    },5000)
  }

  const padding = {
    padding: 5
  }

  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  return (
    <div className="container">
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/notes">notes</Link>
      <Link style={padding} to="/users">users</Link>
      {user
        ? <em>{user} logged in</em>
        : <Link style={padding} to="/login">login</Link>
      }

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
