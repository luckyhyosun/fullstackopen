import { useState } from 'react'
import { useDispatch } from 'react-redux'
import userService from '../services/user'
import { setNotification } from '../reducers/notification'

const NewUser = () => {
  const newUserStyle = {
    backgroundColor: "#C5E0ED",
    borderRadius: "20px",
    margin: "10px",
    padding: "10px"
  }

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [contact, setContact] = useState('')

  const onAddUser = async (e) => {
    e.preventDefault();
    await userService.addUser({username,contact})
    dispatch(setNotification(`✅ ${username} is created!`))

    setUsername('')
    setContact('')
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
