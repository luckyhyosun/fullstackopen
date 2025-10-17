import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import {
  Table,
  TableContainer,
  Paper,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'

const Notes = () => {
  const notes = useSelector(state => state.notes)

  return (
  <div>
    <h2>Notes</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notes.map(note => (
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </TableCell>
              <TableCell>
                {note.user.username}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)
}

export default Notes
