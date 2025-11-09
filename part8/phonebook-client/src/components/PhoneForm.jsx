import { useState, useEffect } from 'react'
import { useMutation } from "@apollo/client/react";
import { EDIT_NUMBER, ALL_PERSONS } from '../queries'

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [ changeNumber, result ] = useMutation(EDIT_NUMBER, {
    refetchQueries: [ { query: ALL_PERSONS } ],
      onError: (error) => {
        console.log("graphQLErrors:", error.graphQLErrors)
        console.log("message:", error.message)

        // const messages = error.graphQLErrors.map(e => e.message).join('\n')

        setError(error.message)
      }
    })

  useEffect(() => {
    if(result.data && result.data.editNumber === null){
      setError('person not found')
    }
  }, [result.data])

  const submit = (event) => {
    event.preventDefault()

    changeNumber({variables: {name, phone}})

    setName('')
    setPhone('')
  }

  return (
    <div>
      <h2>change number</h2>

      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>

        <div>
          phone <input
            value={phone}
            onChange={({target}) => setPhone(target.value)}
          />
        </div>
        <button type='submit'>change!</button>
      </form>
    </div>
  )
}

export default PhoneForm
