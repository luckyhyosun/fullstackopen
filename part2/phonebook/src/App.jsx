import { useState, useEffect } from 'react'
import pplService from './services/people';

const Notification = (props) => {
  console.log(props.status);
  if(props.message === null){
    return null
  }

  return (
    <div className={`notification ${props.status}`}>
      {props.message}
    </div>
  )
}

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
  const [notificationStatus, setNotificationStatus] = useState('default');
  const [notificationMessage, setNotificationMessage] = useState('Loading...')

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
      number: newNumber
    }

    const findTheUser = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
    if(findTheUser){
      const updatedUser = {...findTheUser, number:newNumber}
      console.log(findTheUser);
      const confirmQuestion = window.confirm(`${findTheUser.name} is already existed. Do you want to update the old number with the new one?`);
      if(confirmQuestion){
      pplService
        .updateUser(findTheUser.id, updatedUser)
        .then(returnedPpl => {
          console.log(returnedPpl);
          const updatedUsers = persons.map(person => person.id === findTheUser.id ? updatedUser : person)
          setPersons(updatedUsers);

          setNotificationStatus('success');
          setNotificationMessage(`Added ${personObj.name}`);
          setTimeout(() =>{setNotificationMessage(null)},3000);
        })
        .catch(error => {
          setNotificationStatus('fail');
          setNotificationMessage(`Information of ${personObj.name} has already been removed`);
          setTimeout(() =>{setNotificationMessage(null)},3000);
        })
      }else{
        return;
      }
    }else{
      pplService
        .adduser(personObj)
        .then(returnedPpl => {
          setPersons(persons.concat(returnedPpl))

          setNotificationStatus('success');
          setNotificationMessage(`Added ${personObj.name}`);
          setTimeout(() =>{setNotificationMessage(null)},3000);
        })
        .catch(error => {
          setNotificationStatus('fail');
          setNotificationMessage(`Information of ${personObj.name} has already been removed`);
          setTimeout(() =>{setNotificationMessage(null)},3000);
        })
    }

    setNewName('');
    setNewNumber('');
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
      .catch(error => {
          setNotificationMessage(`Information of ${findTheUser.name} has already been removed`);
          setNotificationStatus('fail');
          setTimeout(() =>{setNotificationMessage(null)},5000);
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} status={notificationStatus}/>
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
