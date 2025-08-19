import { useState, useEffect } from 'react'
import Note from './components/Note'
import Footer from './components/Footer'
import Notification from './components/Notification'
import noteSerive from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    noteSerive
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  // console.log('render', notes.length, 'notes')

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important);

  const toggleImportanceOf = id => {
    console.log(`importance of ${id} needs to be toggled`)

    const note = notes.find(note => note.id === id);
    const changedNote = {...note, important:!note.important}

    noteSerive
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(() => {
        setErrorMessage(`The note '${note.content}' was already deleted from server`);
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
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

  const deleteNote = (id) => {
    noteSerive
      .deleteNote(id)
      .then(() => {
        setNotes(notes.filter((note) => note.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? "important" : "all"}</button>
      </div>
      <p>This list shows <b>{showAll ? "all list" : "only important list"}</b></p>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            deleteNote = {() => deleteNote(note.id)}
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

      <Footer />
    </div>
  )
}

export default App
