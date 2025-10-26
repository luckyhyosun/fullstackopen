import { useState } from 'react'

const NewUser = () => {
  const newUserStyle = {
    backgroundColor: "#C5E0ED",
    borderRadius: "20px",
    margin: "10px",
    padding: "10px"
  }

  const [username, setUsername] = useState('')
  const [contact, setContact] = useState('')

  const onAddUser = (e) => {
    e.preventDefault();
    console.log('controlled component username: ', username)
    console.log('controlled component contact: ', contact)
  }

  return (
    <div style={newUserStyle}>
      <h2>Add a New User</h2>
      <form onSubmit={onAddUser}>
        <label htmlFor='username'>Username: </label>
        <input type="text" id="username" value={username} onChange={({target}) => setUsername(target.value)}/>
        <br />
        <label htmlFor='phoneNumber'>contact no: </label>
        <input type='text' id='phoneNumber' value={contact} onChange={({target}) => setContact(target.value)}/>
        <br />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default NewUser
