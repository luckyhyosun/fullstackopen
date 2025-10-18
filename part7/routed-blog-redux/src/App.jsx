import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Home from './components/Home'
import Note from './components/Note'
import Notes from './components/Notes'
import User from './components/User'
import Login from './components/Login'
import Footer from './components/Footer'
import Notification from './components/Notification'
import { fetchNotes } from './reducers/noteReducer'
import { fetchUsers, logoutUser } from './reducers/userReducer'

import {
  Routes,
  Route,
  Link,
} from "react-router-dom"


const App = () => {
  const dispatch = useDispatch()
  const isUserLoggedIn = useSelector (state => state.users.loggedInUser)

  useEffect(() => {
    dispatch(fetchNotes())
    dispatch(fetchUsers())
  }, [dispatch])

  const padding = {
    padding: 5
  }

  return (
    <div className="container">
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/notes">notes</Link>
      { isUserLoggedIn
        ? <div style={{display:"inline-block"}}>
          <Link style={padding} to={`/user/${isUserLoggedIn.id}`}>user</Link>
          {isUserLoggedIn.username} is logged in {' '}
          <Link style={padding} to='/' onClick={() => {dispatch(logoutUser(null))}}>logout</Link>
          </div>
        : <Link style={padding} to="/login">login</Link>
      }
      <Notification />
      <Routes>
        <Route path="/note/:id" element={<Note />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
