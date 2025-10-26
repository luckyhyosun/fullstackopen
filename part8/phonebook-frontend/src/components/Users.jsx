import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers, deleteUser } from '../reducers/user'

const Users = () => {
  const usersStyle = {
    backgroundColor: "#C5EDE6",
    borderRadius: "20px",
    margin: "10px",
    padding: "10px"
  }

  const dispatch = useDispatch()
  const allUsers = useSelector(state => state.users)

  const onDeleteuser = (id) => {
    dispatch(deleteUser(id))
  }

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  return (
    <div style={usersStyle}>
      <h2>All User</h2>
      {allUsers.length === 0
        ? <i>no users are registerd yet</i>
        : (<ul>
          {allUsers.map(user =>
            <li key={user.id}>
              {user.username} - {user.contact} {' '}
              <button onClick={() => onDeleteuser(user.id)}>delete</button>
            </li>)}
        </ul>)
      }
    </div>
  )
}

export default Users
