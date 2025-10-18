import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { loginCheck, addUser } from '../reducers/userReducer'
import { createNotification, resetNotiAction } from '../reducers/notificationReducer'

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const loggedInUser = useSelector(state => state.loggedInUser)

  const onLogin = (event) => {
    event.preventDefault()

    if(!username){
      dispatch(createNotification('Write the username'))
      setTimeout(() => {dispatch(resetNotiAction())}, 2000)
      return
    }

    dispatch(loginCheck(username, password))

    if(!loggedInUser){
      setUsername('')
      setPassword('')

      dispatch(createNotification(`${username} is not registered, please sign up! 🤓`))
      setTimeout(() => {dispatch(resetNotiAction())}, 5000)
      return
    }

    dispatch(createNotification(`Login succeed👋, ${username}`))
    setTimeout(() => {dispatch(resetNotiAction())}, 5000)

    navigate('/user')
  }

  const onSignup = (event) => {
    event.preventDefault()
    dispatch(addUser(username, password))

    if(!username){
      dispatch(createNotification('Write the username'))
      setTimeout(() => {dispatch(resetNotiAction())}, 2000)
      return
    }
    dispatch(createNotification(`Sign up succeed👍, ${username}`))
    setTimeout(() => {dispatch(resetNotiAction())}, 5000)

    navigate('/')
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
