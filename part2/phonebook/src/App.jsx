import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleAddButtton = (event) => {
    event.preventDefault();
    const personObj = {
      name: newName
    }
    console.log(personObj);

    setPersons(persons.concat(personObj));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input
          value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          <button
            type="submit"
            onClick={handleAddButtton}
          >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <p>{persons.map(person => {
        person.name
      })}</p>
      <div>debug: {newName}</div>
    </div>
  )
}

export default App
