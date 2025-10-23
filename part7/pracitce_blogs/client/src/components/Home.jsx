import { useSelector } from 'react-redux'

const Home = () => {
  const allUsers = useSelector(state => state.users.allUsers)
  const allBlogs = useSelector(state => state.blogs)

  return (
    <>
      <h1>Home</h1>

      <h3>All Blogs</h3>
      {!allBlogs
        ? 'no blog yet'
        : (<ul>
          {allBlogs.map(blog => (
            <div key={blog.id}>
              <li><strong>{blog.title}</strong></li>
              {blog.content}
            </div>
            ))}
        </ul>)
      }

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
