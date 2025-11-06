import { useState } from 'react'
import { useMutation } from "@apollo/client/react";
import { ALL_AUTHORS, UPDATE_YEAR } from '../queries'

const BirthYear = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateUser] = useMutation(UPDATE_YEAR, {refetchQueries: [{query: ALL_AUTHORS}]})

  const submit = (event) => {
    event.preventDefault()

    updateUser({variables: {name, setBornTo: parseInt(born)}})

    setName('')
    setBorn('')
  }

  return (
    <form onSubmit={submit}>
      Name:
      <input
        type="text"
        value={name}
        onChange={({target}) => setName(target.value)}
      />
      <br />
      Year:
      <input
        type="text"
        value={born}
        onChange={({target}) => setBorn(target.value)}
      />
      <br />
      <button type='submit'>update!</button>
    </form>
  )
}

const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const authors = props.authors || []

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set Birth Year</h2>
      <BirthYear />
    </div>
  )
}

export default Authors
