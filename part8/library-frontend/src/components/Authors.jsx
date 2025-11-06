import { useState } from 'react'
import { useMutation } from "@apollo/client/react";
import { ALL_AUTHORS, UPDATE_YEAR } from '../queries'
import Select from 'react-select';

const BirthYear = ({authors}) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const options = authors.map(author => ({value: author.name, label: author.name}))

  const [updateUser] = useMutation(UPDATE_YEAR, {refetchQueries: [{query: ALL_AUTHORS}]})

  const submit = (event) => {
    event.preventDefault()

    updateUser({variables: {name: name.value, setBornTo: parseInt(born)}})

    setName(null)
    setBorn('')
  }

  return (
    <form onSubmit={submit}>
      <Select
        defaultValue={name}
        onChange={setName}
        options={options}
        isClearable
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
      <BirthYear authors={authors}/>
    </div>
  )
}

export default Authors
