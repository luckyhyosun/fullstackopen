import { useState, useEffect, useRef } from 'react'
import noteService from './services/notes'
import loginService from './services/login'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/Noteform'

const App = () => {
  const [notes, setNotes] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [errorMsg, setErrorMsg] = useState('Error console')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService
      .getAll()
      .then(result => {
        setNotes(result)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  if(!notes){return null}

  const addNote = noteObject => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(result => {
        setNotes(notes.concat(result))
      })
  }

  const handleShowAllBtn = () => {
    setShowAll(!showAll)
  }

  const noteToShow = showAll
    ? notes.filter(note => note.important)
    : notes

  const handelChangeImportant = id => {
    const note = notes.find(note => note.id === id)
    const updatedNote = { ...note, important: !note.important }

    noteService
      .update(id, updatedNote)
      .then(result => setNotes(notes.map(note => note.id === id ? result : note)))
      .catch(() => {
        setErrorMsg(`Note '${note.content}' was already deleted from server`)
        setTimeout(() => {
          setErrorMsg('Error console')
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
    })
  }

  const handleDeleteNote = async id => {
    try{
      await noteService.remove(id)
      setNotes(notes.filter(note => note.id !== id))
    }catch(error) {
      setErrorMsg(error)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMsg('wrong credentials')
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const loginForm = () => (
    <Togglable buttonLabel="Show login">
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    </Togglable>
  )

  const noteForm = () => (
    <Togglable buttonLabel="New note" ref={noteFormRef}>
      <NoteForm createNote={addNote}/>
    </Togglable>
  )

  return (
    <div>
      <h1>Notes</h1>
      {errorMsg && <Notification message={errorMsg}/>}

      {!user && loginForm()}
      {user && (
        <div>
          <h2>
            Hello, {user.name}! 👋
            <button onClick={handleLogout}>Logout</button>
          </h2>
          {noteForm()}
        </div>
      )}

      <button onClick={handleShowAllBtn} className='functionalBtn showHideLogin'>
        Show {showAll ? 'All Note' : 'Important Note'}
      </button>

      <ul>
        {noteToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            handelChangeImportant={() => handelChangeImportant(note.id)}
            handleDeleteNote={() => handleDeleteNote(note.id)}
          />)}
      </ul>

      <Footer />
    </div>
  )
}

export default App
