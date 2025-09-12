const Note = ({ note, handelChangeImportant }) => {
  const label = note.important ? "🔁 Not important" : "🔁 Imortant"

  return (
    <li className='note'>
      {note.content}
      <button onClick={handelChangeImportant}>{label}</button>
    </li>
  )
}

export default Note
