import { useState } from 'react'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!props.show) return null

  const loginSubmit = (event)=> {
    event.preventDefault()

    console.log(username, password);
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
