import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteSerive from './services/notes'
import axios from 'axios'

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log('effect')
    noteSerive
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const toggleImportanceOf = id => {
    console.log(`importance of ${id} needs to be toggled`)

    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find(note => note.id === id);
    const changedNote = {...note, important:!note.important}

    noteSerive
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => {
          note.id === id ? returnedNote : note
        }))
      })
      .catch(error => {
        alert(`The note '${note.content}' was already deleted from server`);

        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5
    }
    noteSerive
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      })
  }
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }
  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? "important" : "all"}</button>
      </div>
      <p>This list shows <b>{showAll ? "all list" : "only important list"}</b></p>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance = {() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <form onSubmit={addNote}>
        <input
        value={newNote}
        onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
