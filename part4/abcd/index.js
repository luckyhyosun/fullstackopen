const logger = require('./utils/logger')
const config = require('./utils/config')

const express = require('express')
const Note = require('./models/note')

const app = express()

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes)
  })
})

app.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id
  Note.findById(id)
    .then(note => {
      if(note){
        res.json(note)
      }else{
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/notes', (req, res, next) => {
  const body = req.body

  if(!body.content){
    return res.status(400).json({ error: 'Bad Request: content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then((savedNote) => {
      res.json(savedNote)
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id
  const { content, important } = req.body

  Note.findById(id)
    .then(note => {
      if(!note){
        return res.status(404).end()
      }
      note.content = content
      note.important = important

      return note.save().then(updatedNote => res.json(updatedNote))
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (req, res, next) => {
  const id = req.params.id
  // notes = notes.filter(note => note.id !== id)

  // res.status(204).end()
  Note.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

logger.info(`Server running on port ${config.PORT}`)
