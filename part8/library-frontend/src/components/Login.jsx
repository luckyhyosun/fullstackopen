import { useState, useEffect } from 'react'
import { useMutation } from "@apollo/client/react";
import { LOGIN } from '../queries'

const Login = ({ show, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    }
  })

  useEffect(() => {
      if(result.data){
        const token = result.data.login.value
        setToken(token)
        localStorage.setItem('library-user-token', token)
      }
    }, [result.data])

  if (!show) {
    return null
  }

  const loginSubmit = (event)=> {
    event.preventDefault()

    console.log(username, password);
    login({ variables: {username, password}})
  }

  return(
    <div>
      <h2>login</h2>

      <form onSubmit={loginSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
