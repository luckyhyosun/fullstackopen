const Note = ({ note, handelChangeImportant, handleDeleteNote }) => {
  const label = note.important ? '🔁 Not important' : '🔁 Important'

  return (
    <li className='note'>
      <button className="deleteBtn" onClick={handleDeleteNote}>X</button>
      {note.content}
      <button onClick={handelChangeImportant}>{label}</button>
    </li>
  )
}

export default Note
