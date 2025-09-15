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
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({username, password})
      setUser(user)

      window.localStorage.setItem('loggedinUser', JSON.stringify(user))

      blogService.setToken(user.token)

      setUsername('')
      setPassword('')
    }catch{
      console.log('longin error!')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedinUser')
    setUser(null)
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  const handleNewblog = async (event) => {
    event.preventDefault()
    if(!user){
      window.alert('only logged-in user can create blog!')
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      return
    }
    const newBlog = await blogService.create({ title, author, url })
    setBlogs(blogs.concat(newBlog))
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  const handleDelete = async (id) => {
    if(!user){
      window.alert('only logged-in user can delete blog!')
      return
    }
    const removedBlog = await blogService.remove(id)
    console.log(removedBlog);
    setBlogs(blogs.filter(blog => blog.id !== id))
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
    return blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        handleDelete={() => handleDelete(blog.id)}
      />)
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
        </div>
      }
      {showblogs()}
    </div>
  )
}

export default App
