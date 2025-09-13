require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note')

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

app.get('/', (request, response) => {
    response.json('<h1>Hello</h1>')
})

app.get('/api/notes', (request, response, next) => {
    Note.find({}).then(notes => response.json(notes))
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    Note.findById(id)
        .then(note => {
            if(note){
                response.json(note)
            }else{
                response.state(404)
            }
        })
        .catch(error => next(error))
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if(!body.content){
        return response.status(404).json({
            error: 'content missing'
        })
    }

    const newNote = new Note({
        content: body.content,
        important: body.important || false
    })

    newNote.save().then(newNote => response.json(newNote))
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    Note.findByIdAndDelete(id).then(response.status(200).end())
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${process.env.PORT}`))
