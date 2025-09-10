import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('Add a new note here')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log(response.data);
        setNotes(response.data)
      })
  }, [])

  const addNote = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
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

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={handleShowAllBtn}>
        Show {showAll ? 'All Note' : 'Important Note'}
      </button>

      <ul>
        {noteToShow.map(note => <Note key={note.id} note={note}/>)}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button>save</button>
      </form>
    </div>
  )
}

export default App
