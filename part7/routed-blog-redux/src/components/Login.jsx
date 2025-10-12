import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { setLoginUser } from '../reducers/userReducer'
import { createNotification, resetNotiAction } from '../reducers/notificationReducer'

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const dispatch = useDispatch()

  const onSubmit = (event) => {
    event.preventDefault()

    dispatch(setLoginUser(username))
    dispatch(createNotification(`Hello, ${username}`))
    setTimeout(() => {dispatch(resetNotiAction())}, 2000)

    navigate('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input type='text'onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
          password: <input type='password' />
        </div>
        <button type="submit" primary=''>login</button>
      </form>
    </div>
  )
}

export default Login
