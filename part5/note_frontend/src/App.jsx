import { useState, useEffect } from 'react'
import noteService from './services/notes'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('Add a new note here')
  const [showAll, setShowAll] = useState(false)
  const [errorMsg, setErrorMsg] = useState('Error console')

  useEffect(() => {
    noteService
      .getAll()
      .then(result => {
        setNotes(result)
      })
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

  const handelChangeImportant = (id) => {
    const note = notes.find(note => note.id === id)
    const updatedNote = { ...note, important: !note.important }

    noteService
      .update(id, updatedNote)
      .then(result => setNotes(notes.map(note => note.id === id ? result : note)))
      .catch(error => {
        setErrorMsg(`Note '${note.content}' was already deleted from server`)
        setTimeout(() => {
          setErrorMsg('Error console')
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg}/>

      <button onClick={handleShowAllBtn} className='functionalBtn'>
        Show {showAll ? 'All Note' : 'Important Note'}
      </button>

      <ul>
        {noteToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            handelChangeImportant={() => handelChangeImportant(note.id)}
          />)}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button className='functionalBtn'>save</button>
      </form>

      <Footer />
    </div>
  )
}

export default App
