import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filteredNames, setFilteredName] = useState([]);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleFilterNameChange = (event) => {
  const inputValue = event.target.value;
  setFilterName(inputValue);

  if (!inputValue) {
    setFilteredName([]);
  } else {
    const filtered = persons.filter(person =>
      person.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredName(filtered);
  }
};

  const handleAddButtton = (event) => {
    event.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    console.log(personObj);

    persons.forEach(person => {
      if(person.name === personObj.name){
        alert(`${newName} is already added to phonebook`);
        setPersons(persons);
      }else{
        setPersons(persons.concat(personObj));
      }
      setNewName('');
      setNewNumber('');
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input
          value={filterName}
          onChange={handleFilterNameChange}
        />
      </div>
      <h2>Add a New User</h2>
      <form>
        <div>
          name: <input
          value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button
            type="submit"
            onClick={handleAddButtton}
          >add</button>
        </div>
      </form>
      <h2>Fitered Numbers</h2>

      <div>
        {filteredNames.map(person => (
          <div key={person.id}>
            <p>{person.name} {person.number}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
