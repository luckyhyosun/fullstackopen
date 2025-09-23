const Login = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <div className="loginform">
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <button type="submit" className="functionalBtn">Login</button>
      </form>
    </div>
  )
}

export default Login
