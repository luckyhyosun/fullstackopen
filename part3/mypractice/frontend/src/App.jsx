import {useState} from 'react'
import Animal from './components/Animal'

const App = (props) => {
  const [animals, setAnimals] = useState(props.animals)
  const [newAnimal, setNewAnimal] = useState('Add your favorite Animal')
  const [showAll, setShowAll] = useState(true);
  const [filteredAnimal, setFilteredAnimal] = useState([]);

  const allAnimals = showAll ? animals : animals.filter(animal => animal.endangered === true)

  const addAnimal = (e) => {
    e.preventDefault()

    animals.forEach(animal => {
      if(animal.name.toLowerCase() === newAnimal.toLowerCase()){
        alert(`${newAnimal} is already existed.`)
      }
    })
    const newObject = {
      name: newAnimal,
      endangered: Math.random() < 0.5,
      id: String(animals.length + 1)
    }
    setAnimals(animals.concat(newObject))
    setNewAnimal('')
  }

  const handleAnimalChange = (e) => {
    setNewAnimal(e.target.value)
  }

   const handleClick = () => {
    setShowAll(!showAll)
  }

  const handleFilterChange = (e) => {
    const foundAnimals = animals.filter(animal => animal.name.toLowerCase().includes(e.target.value.toLowerCase()))
    // console.log(foundAnimals);
    // console.log(e.target.value);

    if(e.target.value === ''){
      setFilteredAnimal([])
    }else{
      setFilteredAnimal(foundAnimals)
    }
  }

  return (
    <div>
      <h1>🐬 Animals 🐘</h1>
      <div>
        <button onClick={handleClick}>I wanna see {showAll ? "Endangered" : "All"} Animals</button>
      </div>
      <ul>
        {allAnimals.map(animal => <Animal key={animal.id} name={animal.name}/>)}
      </ul>
      <form onSubmit={addAnimal}>
        <input
          onChange={handleAnimalChange}
          value={newAnimal} />
        <button type='submit'>save</button>
      </form>

      <div>
        <h3>Find Animals</h3>
        <input  onChange={handleFilterChange}/>
        <ul>
          {filteredAnimal.map(animal => {
            // console.log(animal);
            return <li key={animal.id}>{animal.name}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default App
