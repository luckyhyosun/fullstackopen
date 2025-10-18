import { useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"

import {
  Table,
  TableContainer,
  Paper,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'

const User = () => {
  const allUser = useSelector(state => state.users.all)

  const id = useParams().id
  const user = allUser.find(user => user.id === id)

  return (
    <div>
      <h2>User Page</h2>
      {user? <p>Hello 👋, {user.username}</p> : <p>Please login first!</p>}
      <h3>{user.username}'s Blogs</h3>
      <p>{user.username} has {user.blogs.length} blogs</p>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {user.blogs.map(note => (
              <TableRow key={note.id}>
                <TableCell>
                  <Link to={`/note/${note.id}`}>{note.content}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default User
