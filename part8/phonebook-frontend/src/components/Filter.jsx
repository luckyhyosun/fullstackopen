import { useState } from 'react'
import { useSelector } from 'react-redux'

const Filter = () => {
  const filterStyle = {
    backgroundColor: "#7FBAD7",
    borderRadius: "20px",
    margin: "10px",
    padding: "10px"
  }

  const [filter, setFilter] = useState('')
  const allUsers = useSelector(state => state.users)
  const filteredUsers = allUsers.filter(user => user.username.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div style={filterStyle}>
      <h2>Filter User</h2>
      <label htmlFor="filter">Filter shown with </label>
      <input type="text" id="filter" value={filter} onChange={({target}) => setFilter(target.value)}/>

      <h2>Filter Result</h2>
      {!filter
        ? <i>no result</i>
        : (<ul>
          {filteredUsers.map(user => <li key={user.id}>{user.username} - {user.contact}</li>)}
        </ul>)
      }
    </div>
  )
}

export default Filter
