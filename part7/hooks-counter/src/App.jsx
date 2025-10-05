import useField from './hooks'

const App = () => {
  const name = useField('text')
  const bday = useField('date')
  const height = useField('number')

  return (
    <div>
      <form>
        name:
        <input
          type={name.type}
          value={name.value}
          onChange={name.onChange}
        />
        <br/>
        birthdate:
        <input
          type={bday.type}
          value={bday.value}
          onChange={bday.onChange}
        />
        <br />
        height:
        <input
          type={height.type}
          value={height.value}
          onChange={height.onChange}
        />
      </form>
      <h3>
          {name.value} <br />
          {bday.value} <br />
          {height.value}
      </h3>
    </div>
  )
}

export default App
