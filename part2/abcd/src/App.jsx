import Note from './components/Note'

const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {/* Because the code generating the li tags is JavaScript, it must be wrapped in curly braces in a JSX template just like all other JavaScript code. */}
        {notes.map(note =>
          // Note that the key attribute must now be defined for the Note components, and not for the li tags like before.
          <Note key={note.id} note ={note}/>)
        }
      </ul>
    </div>
  )
}

export default App
