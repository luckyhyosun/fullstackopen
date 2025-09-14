import { useState, useEffect } from 'react'
import noteService from './services/notes'
import loginService from './services/login'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/Login'

const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [errorMsg, setErrorMsg] = useState('Error console')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const addNote = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
  }

    noteService
      .create(noteObject)
      .then(result => {
        setNotes(notes.concat(result))
        setNewNote('')
      })
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
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

  const handleDeleteNote = id => {
    noteService
      .remove(id)
      .then(setNotes(notes.filter(note => note.id !== id)))
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

  const loginForm = () => {
    return <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
  }

  const noteForm = () => {
    return <form onSubmit={addNote} className='noteform'>
        <input value={newNote} onChange={handleNoteChange} placeholder='Add note here...'/>
        <button className='functionalBtn'>save</button>
      </form>
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg}/>

      {!user && loginForm()}
      {user && (
        <div>
          <h2>Hello, {user.name}! 👋</h2>
          {noteForm()}
        </div>
      )}

      <button onClick={handleShowAllBtn} className='functionalBtn'>
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
