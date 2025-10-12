import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Home from './components/Home'
import Note from './components/Note'
import Notes from './components/Notes'
import Users from './components/Users'
import Login from './components/Login'
import Footer from './components/Footer'
import Notification from './components/Notification'
import { fetchNotes } from './reducers/noteReducer'

import {
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom"


const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchNotes())
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

  return (
    <div className="container">
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/notes">notes</Link>
      <Link style={padding} to="/users">users</Link>
      {user
        ? <em>{user} logged in</em>
        : <Link style={padding} to="/login">login</Link>
      }
      <Notification message={message}/>
      <Routes>
        <Route path="/notes/:id" element={<Note />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
