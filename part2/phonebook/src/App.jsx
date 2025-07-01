import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
        filter shown with <input
          value={props.value}
          onChange={props.onChange}
        />
      </div>
  )
}

const PersonForm = (props) => {
  return (
    <form>
        <div>
          name: <input
          value={props.nameValue}
          onChange={props.nameOnChange}/>
        </div>
        <div>
          number: <input
          value={props.numberValue}
          onChange={props.numberOnChange}/>
        </div>
        <div>
          <button
            type="submit"
            onClick={props.btnOnClick}
          >add</button>
        </div>
      </form>
  )
}

const Persons = ({filteredNames}) => {
  return (
    <div>
        {filteredNames.map(person => (
          <div key={person.id}>
            <p>{person.name} {person.number}</p>
          </div>
        ))}
      </div>
  )
}

const App = () => {
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log("data fectched!");
        setPersons(response.data);
      })
  },[])
  const [persons, setPersons] = useState([]);
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
      <Filter value={filterName} onChange={handleFilterNameChange}/>

      <h2>Add a New User</h2>
      <PersonForm
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
        btnOnClick={handleAddButtton}
      />

      <h2>Fitered Numbers</h2>
      <Persons filteredNames = {filteredNames}/>
    </div>
  )
}

export default App
