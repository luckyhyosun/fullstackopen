import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { loginCheck, addUser } from '../reducers/userReducer'
import { createNotification, resetNotiAction } from '../reducers/notificationReducer'

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const loggedInUser = useSelector(state => state.users.loggedInUser)
  const allUsers = useSelector(state => state.users.all)

  // handle login success
  useEffect(() => {
    if(loggedInUser){
      dispatch(createNotification(`Login succeed👋, ${username}`))
      setTimeout(() => {dispatch(resetNotiAction())}, 5000)

      setUsername('')
      setPassword('')
      navigate(`/user/${loggedInUser.id}`)
    }
  }, [loggedInUser])

  const onLogin = (event) => {
    event.preventDefault()

    if(!username){
      dispatch(createNotification('Write the username'))
      setTimeout(() => {dispatch(resetNotiAction())}, 2000)
      return
    }

    const isUserRegistered = allUsers.some(user => user.username === username)

    if(!isUserRegistered){
      setUsername('')
      setPassword('')
      dispatch(createNotification(`${username} is not registered, please sign up! 🤓`))
      setTimeout(() => {dispatch(resetNotiAction())}, 5000)
      return
    }

    dispatch(loginCheck(username, password))
  }

  const onSignup = (event) => {
    event.preventDefault()
    const isUserExisted = allUsers.some(user => user.username === username)

    if(!username){
      dispatch(createNotification('Write the username'))
      setTimeout(() => {dispatch(resetNotiAction())}, 2000)
      return
    }

    if(isUserExisted){
      setUsername('')
      setPassword('')

      dispatch(createNotification(`${username} is already existed.`))
      setTimeout(() => {dispatch(resetNotiAction())}, 2000)
      return
    }

    dispatch(addUser(username, password))
    dispatch(createNotification(`Sign up succeed👍, ${username}`))
    setTimeout(() => {dispatch(resetNotiAction())}, 5000)

    navigate(`/user/${loggedInUser.id}`)
  }

  return (
    <div>
      <h2>login</h2>
      <form>
        <div>
          username: <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
          password: <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" onClick={onLogin}>login</button>
        <button type="submit" onClick={onSignup}>sign up</button>
      </form>
    </div>
  )
}

export default Login
