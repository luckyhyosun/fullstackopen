import { useState, useEffect } from 'react'
import countryService from './services/countries'

function App() {
  const [countryName, setCountryName] = useState(null);

  useEffect(() => {
    countryService
      .getAllCountires()
      .then(initialCounties => {
        console.log(initialCounties);

      })
  })

  const handleInputChange = (event) => {
    console.log(event.target.value);

  }

  return (
    <div>
      find counturies <input onChange={handleInputChange}/>
    </div>
  )
}

export default App
