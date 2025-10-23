import { useSelector } from 'react-redux'

const Home = () => {
  const allUsers = useSelector(state => state.users.allUsers)

  return (
    <>
      <h1>Home</h1>
      <h3>All Users</h3>
      {!allUsers
        ? <i>no user yet</i>
        : (<ul>
          {allUsers.map(user => (<li key={user.id}>{user.username}</li>))}
        </ul>)
      }
    </>
  )
}

export default Home
