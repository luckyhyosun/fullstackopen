import axios from 'axios'
import { useState, useEffect } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if(!name){
      setCountry(null)
      return
    }
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => setCountry({
        data: response.data,
        found: true
      }))
  }, [name])

  return country
}

export { useField, useCountry }
