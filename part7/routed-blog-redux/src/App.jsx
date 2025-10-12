import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchNotes())
  }, [])

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
      <Notification />
      <Routes>
        <Route path="/notes/:id" element={<Note />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
