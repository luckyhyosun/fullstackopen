require('dotenv').config()

const express = require('express')
const app = express()
const Animal = require('./models/animal')

app.use(express.json())
app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/', (req, res) => {
  res.send('<h1>Animal book!</h1>')
})

app.get('/api/animals', (req, res) => {
  Animal.find({}).then(animals => res.json(animals))
})

app.get('/api/animals/:id', (req, res) => {
    const id = req.params.id
    Animal.findById(id)
      .then(animal => res.json(animal))
})

app.delete('/api/animals/:id', (req, res) => {
    const id = req.params.id
    Animal.findByIdAndDelete(id)
      .then(animal => res.json(animal))
})

app.post('/api/animals', (req, res) => {
    const body = req.body
    if(!body.name){
        return response.state(404).json({
            error: 'Name field is missing'
        })
    }

    const newAnimal = new Animal({
        name : body.name,
        endangered : body.emdangered || false,
    })

    newAnimal.save().then(savedAnimal => res.json(savedAnimal))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
