const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <div className='loginComp'>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>

        <div className='loginField'>
          <label>Username:
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>

        <div className='loginField'>
          <label>Password:
            <input
              type="text"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>

        <button type="submit" className='functionalBtn'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
