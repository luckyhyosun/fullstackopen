import { useState, useEffect } from 'react'
import userService from '../services/user'

const Users = () => {
  const usersStyle = {
    backgroundColor: "#C5EDE6",
    borderRadius: "20px",
    margin: "10px",
    padding: "10px"
  }

  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    userService
      .allUsers()
      .then(users => setAllUsers(users))
  }, [allUsers])

  return (
    <div style={usersStyle}>
      <h2>All User</h2>
      {!allUsers
        ? 'no users are registerd yet'
        : (<ul>
          {allUsers.map(user => <li key={user.id}>{user.username} - {user.contact}</li>)}
        </ul>)
      }
    </div>
  )
}

export default Users
