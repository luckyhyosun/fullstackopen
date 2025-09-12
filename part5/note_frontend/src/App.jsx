import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('Add a new note here')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    noteService
      .getAll()
      .then(result => {
        setNotes(result)
      })
  }, [])

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
        console.log(error)

        alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
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
    </div>
  )
}

export default App
