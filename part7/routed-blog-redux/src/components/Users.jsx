import { useSelector } from "react-redux"

const Users = () => {
  const user = useSelector(state => state.users)
  if(user){
    console.log(user);
  }

  return (
    <div>
     <h2>User Page</h2>
     {user? <p>Hello 👋, {user.username}</p> : <p>Please login first!</p>}
    </div>
  )
}

export default Users
