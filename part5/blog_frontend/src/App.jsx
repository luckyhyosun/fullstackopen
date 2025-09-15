import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedinUser = localStorage.getItem('loggedinUser')
    if(loggedinUser){
      const user = JSON.parse(loggedinUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({username, password})
      setUser(user)

      window.localStorage.setItem('loggedinUser', JSON.stringify(user))

      setUsername('')
      setPassword('')
    }catch{
      console.log('longin error!')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedinUser')
    setUser(null)
  }

  const showLoginform = () => {
    return <Login
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
  }

  const showblogs = () => {
    return blogs.map(blog => <Blog key={blog.id} blog={blog} />)
  }

  return (
    <div>
      <h2>blogs</h2>

      {!user && showLoginform()}
      {user && <div>
        <h2>
          {`Hello, ${user.name}! 👋`}
          <button onClick={handleLogout} className='functionalBtn inlineBtn'>Logout</button>
        </h2>
        {showblogs()}
        </div>
      }

    </div>
  )
}

export default App
