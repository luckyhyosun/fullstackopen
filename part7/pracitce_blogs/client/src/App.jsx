import Home from './components/Home'
import Blogs from './components/Blogs'
import Login from './components/Login'

import {
  Routes,
  Route,
  Link,
} from "react-router-dom"

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUser } from './reducers/userReducer'
import { fetchAllBlogs } from './reducers/blogReducer'

function App() {
  const dispatch = useDispatch()

  const loggedInUser = useSelector(state => state.users.loggedInUser)

  useEffect(() => {
    dispatch(fetchAllUser())
    dispatch(fetchAllBlogs())
  }, [dispatch])

  const padding = {
    padding: 5
  }

  const onHandleLogout = (id) => {
    console.log(id);
  }

  return (
    <>
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/blogs">blogs</Link>
      {loggedInUser
        ? <div style={{"display": "inline"}}>
            {loggedInUser.username} is logged in!
            <button onClick={() => onHandleLogout(loggedInUser.id)}>logout</button>
          </div>
        : <Link style={padding} to="/login">login</Link>
      }

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
