import {useState, useEffect} from 'react'
import axios from 'axios'
import Animal from './components/Animal'
import FilterAnimal from './components/Filter'
import AddAnimal from './components/Add'

const App = (props) => {
  const [animals, setAnimals] = useState([])
  const [newAnimal, setNewAnimal] = useState('Add your favorite Animal')
  const [showAll, setShowAll] = useState(true);
  const [filteredAnimal, setFilteredAnimal] = useState([]);

  useEffect(() => {
    console.log("Effect Hook")
    axios
      .get('http://localhost:3001/animals')
      .then(res => {
        console.log('promise fulfilled')
        setAnimals(res.data)
      })
  }, [])

  console.log('render', animals.length, 'animals');


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
      <Animal
        clickEventHandler={handleClick}
        showAll={showAll}
        allAnimals={allAnimals}
      />

      <AddAnimal
        clickSubmitHandler={addAnimal}
        clickEventHandler={handleAnimalChange}
        newAnimal={newAnimal}
      />

      <FilterAnimal
        clickEventHandler={handleFilterChange}
        filteredAnimal={filteredAnimal}
      />

    </div>
  )
}

export default App
