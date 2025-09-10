import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('Add a new note here')
  const [showAll, setShowAll] = useState(false)

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
