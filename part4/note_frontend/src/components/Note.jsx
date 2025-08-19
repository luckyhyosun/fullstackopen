const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important ? 'make NOT important' : 'make important'

  return (
    <li className="note">
      <button onClick={deleteNote}> X </button>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
