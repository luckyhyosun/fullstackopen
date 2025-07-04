import { useState, useEffect } from 'react'
import pplService from './services/people';

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

const Persons = (props) => {
  return (
    <div>
        {props.filteredNames.map(person => (
          <div key={person.id}>
            <p>{person.name} {person.number}
            <button onClick={() => props.deleteBtnClick(person.id)}>Delete</button></p>
          </div>
        ))}
      </div>
  )
}

const App = () => {
  useEffect(() => {
    pplService
      .getAllUser()
      .then(initialPpl => {
        setPersons(initialPpl);
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

    if(persons.some(person => person.name.toLowerCase() === newName.toLowerCase())){
      alert("Already added");
      return;
    }
    const personObj = {
      name: newName,
      number: newNumber
    }
    console.log(personObj);

    pplService
      .adduser(personObj)
      .then(returnedPpl => {
        setPersons(persons.concat(returnedPpl))
        setNewName('');
        setNewNumber('');;
      })
  }

  const handleDeleteButtton = (id) => {
    const findTheUser = persons.find(person => person.id === id);
    const confirmQuestion = window.confirm(`Do you really want to delete ${findTheUser.name}?`);
    if (confirmQuestion) {
    pplService
      .deleteUser(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
    }
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
      <Persons
        filteredNames = {filteredNames}
        deleteBtnClick = {handleDeleteButtton}
      />

      <h2><i>All Users</i></h2>
      <Persons
      filteredNames = {persons}
      deleteBtnClick = {handleDeleteButtton}
      />
    </div>
  )
}

export default App
