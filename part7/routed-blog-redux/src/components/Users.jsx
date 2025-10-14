import { useSelector } from 'react-redux'

const Users = () => {
  const border = {
    border: "1px solid black",
    padding: "10px"
  }

  const allUsers = useSelector(state => state.users.all)

  return (<div>
    <h2>All Users</h2>
    <table>
      <tbody>
          <tr>
            <th style={border}>Name</th>
            <th style={border}>Blogs</th>
          </tr>
        {allUsers
      ? allUsers.map(user => (
      <tr key={user.id}>
        <td style={border}>{user.username}</td>
        <td style={border}>{user.blogs.length}</td>
      </tr>))
      : null}
      </tbody>
    </table>
  </div>)
}

export default Users
