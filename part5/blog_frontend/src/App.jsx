import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Newblog from './components/Newblog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [isError, setIsError] = useState(false)

  const createBlogRef = useRef()

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
      const user = await loginService.login({ username, password })

      setUser(user)

      window.localStorage.setItem('loggedinUser', JSON.stringify(user))

      blogService.setToken(user.token)

      setUsername('')
      setPassword('')
    }catch(error){
      setIsError(true)
      showNotification(error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedinUser')
    setUser(null)
    // setBlogTitle('')
    // setBlogAuthor('')
    // setBlogUrl('')
  }

  const handleNewblog = async (newObj) => {
    createBlogRef.current.handleToggle()

    if(!user){
      setIsError(true)
      showNotification('only logged-in user can create blog!')
      return
    }

    const newBlog = await blogService.create(newObj)
    setIsError(false)
    showNotification(`${newBlog.title} by ${newBlog.author} is created!`)
    setBlogs(blogs.concat(newBlog))
  }

  const handleDelete = async (id) => {
    if(!user){
      setIsError(true)
      showNotification('only logged-in user can delete blog!')
      return
    }
    try{
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }catch(error){
      setIsError(true)
      showNotification(error)
    }
  }

  const handleUpdate = async updatedObj => {
    await blogService.update(updatedObj)
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
    return blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleDelete={() => handleDelete(blog.id)}
          updateBlog={handleUpdate}
        />)
  }

  const showNotification = (msg) => {
    setNotification(msg)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  return (
    <div>
      <h2>blogs</h2>

      {notification && <Notification notification={notification} isError={isError}/>}

      {!user && showLoginform()}
      {user && <div>
        <h2>
          {`Hello, ${user.name}! 👋`}
          <button onClick={handleLogout} className='functionalBtn inlineBtn'>Logout</button>
        </h2>
        <Togglable buttonLabel="Create Blog" ref={createBlogRef}>
          <Newblog createBlog={handleNewblog} />
        </Togglable>
      </div>
      }
      {showblogs()}
    </div>
  )
}

export default App
