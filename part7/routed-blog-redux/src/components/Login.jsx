import { useNavigate } from "react-router-dom"

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    navigate('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input type='text'/>
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
