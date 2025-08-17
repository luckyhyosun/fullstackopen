require('dotenv').config()

const express = require('express')
const app = express()
const Animal = require('./models/animal')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.get('/', (req, res) => {
  res.send('<h1>Animal book!</h1>')
})

app.get('/api/animals', (req, res) => {
  Animal.find({}).then((animals) => res.json(animals))
})

app.get('/api/animals/:id', (req, res) => {
  const id = req.params.id
  Animal.findById(id)
    .then((animal) => {
      if (animal) {
        res.json(animal)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/animals/:id', (req, res, next) => {
  const id = req.params.id
  Animal.findByIdAndDelete(id)
    .then(() => res.status(204).end)
    .catch((error) => next(error))
})

app.post('/api/animals', (req, res, next) => {
  const body = req.body
  console.log(body)

  if (!body.name) {
    return res.state(404).json({
      error: 'Name field is missing',
    })
  }

  const newAnimal = new Animal({
    name: body.name,
    endangered: body.endangered || false,
  })

  newAnimal
    .save()
    .then((savedAnimal) => res.json(savedAnimal))
    .catch((error) => next(error))
})

app.put('/api/animals/:id', (req, res, next) => {
  const id = req.params.id
  const { name, endangered } = req.body

  Animal.findById(id)
    .then((animal) => {
      if (!animal) {
        return res.status(404).end()
      }

      animal.name = name
      animal.endangered = endangered

      return animal.save().then((updatedAnimal) => res.json(updatedAnimal))
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
