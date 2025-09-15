import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Newblog from './components/Newblog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setBlogTitle] = useState('')
  const [author, setBlogAuthor] = useState('')
  const [url, setBlogUrl] = useState('')

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

  const handleNewblog = async (event) => {
    event.preventDefault()
    const newBlog = await blogService.create({ title, author, url })
    setBlogs(blogs.concat(newBlog))
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
        <Newblog
          title={title}
          author={author}
          url={url}
          setBlogTitle={setBlogTitle}
          setBlogAuthor={setBlogAuthor}
          setBlogUrl={setBlogUrl}
          handleNewblog={handleNewblog}
        />
        {showblogs()}
      </div>
      }
    </div>
  )
}

export default App
