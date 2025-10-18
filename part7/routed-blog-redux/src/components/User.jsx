import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const User = () => {
  const allUser = useSelector(state => state.users.all)

  const id = useParams().id
  const user = allUser.find(user => user.id === id)

  return (
    <div>
     <h2>User Page</h2>
     {user? <p>Hello 👋, {user.username}</p> : <p>Please login first!</p>}
     <h3>Blogs</h3>
     <p>{user.username} has {user.blogs.length} blogs</p>
    </div>
  )
}

export default User
