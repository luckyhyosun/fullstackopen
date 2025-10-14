import { useSelector } from 'react-redux'

const Users = () => {
  const allUsers = useSelector(state => state.users.all)

  return (<div>
    <h2>All Users</h2>
    <ul>
      {allUsers
      ? allUsers.map(user => (<li key={user.id}>{user.username}</li>))
      : null}
    </ul>
  </div>)
}

export default Users
