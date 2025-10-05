import useField from './hooks'

const App = () => {
  const name = useField('text')
  const bday = useField('date')
  const height = useField('number')

  return (
    <div>
      <form>
        name:
        <input {...name}/>
        <br/>
        birthdate:
        <input {...bday}/>
        <br />
        height:
        <input {...height}/>
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
