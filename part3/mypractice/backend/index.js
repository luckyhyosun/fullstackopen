const express = require('express')
const app = express()

app.use(express.json())

const animals = [
    {
      "id": "1",
      "name": "African Elephant",
      "classification": "Mammal",
      "habitat": "Savannas, forests, and grasslands of Sub-Saharan Africa",
      "importantNote": "Largest land animal on Earth; highly intelligent and social.",
      "endangered": false
    },
    {
      "id": "2",
      "name": "Bald Eagle",
      "classification": "Bird",
      "habitat": "Near lakes, rivers, and coastal regions in North America",
      "importantNote": "Symbol of the United States; known for its excellent eyesight and powerful flight.",
      "endangered": false
    },
    {
      "id": "3",
      "name": "Green Sea Turtle",
      "classification": "Reptile",
      "habitat": "Tropical and subtropical oceans, often near coral reefs",
      "importantNote": "Long-distance migrator; endangered due to plastic pollution and poaching.",
      "endangered": true
    },
    {
      "id": "4",
      "name": "Arctic Fox",
      "classification": "Mammal",
      "habitat": "Arctic tundra regions of the Northern Hemisphere",
      "importantNote": "Has thick fur that changes color with the seasons (white in winter, brown in summer) for camouflage.",
      "endangered": true
    },
    {
      "id": "5",
      "name": "Poison Dart Frog",
      "classification": "Amphibian",
      "habitat": "Tropical rainforests of Central and South America",
      "importantNote": "Brightly colored as a warning; some species have skin toxins strong enough to deter predators or harm humans.",
      "endangered": true
    }
]

app.get('/', (req, res) => {
  res.send('<h1>Animal book!</h1>')
})

app.get('/api/animals', (req, res) => {
  res.json(animals)
})

app.get('/api/animals/:id', (req, res) => {
    const id = req.params.id
    const animal = animals.find(animal => animal.id === id)
    if(animal){
        res.json(animal)
    }else{
        res.status(404).end()
    }
})

app.delete('/api/animals/:id', (req, res) => {
    const id = req.params.id
    const animal = animals.filter(animal => animal.id !== id)

    res.status(204).end()
})

app.post('/api/animals', (req, res) => {
    const animal = req.body
    console.log(animal)
    res.send(animal)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
