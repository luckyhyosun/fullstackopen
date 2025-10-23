import { useState } from 'react'
import styled from 'styled-components'
import userService from '../services/users'
import loginService from '../services/login'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  padding: 0.25em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Login = () => {
  const [username, setusername] = useState('')
  const [password, setPassword] = useState('')

  const onHandleSignup = async (e) => {
    e.preventDefault()
    const user = await userService.signup({username, password})
    console.log(user);
  }

  const onHandleLogin = async (e) => {
    e.preventDefault()
    const user = await loginService.login({username, password})
    console.log(user);
  }

  return (
    <>
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="username">Username: </label>
          <Input type="text" id="username" value={username} onChange={(e) => setusername(e.target.value)}/>
        </div>

        <div>
          <label htmlFor='password' style={{"marginRight": "3px"}}>Password: </label>
          <Input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <Button onClick={onHandleLogin}>login</Button>
        <Button onClick={onHandleSignup}>signup</Button>
      </form>
    </>
  )
}

export default Login
