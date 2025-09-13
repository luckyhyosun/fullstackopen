const express = require('express')
const app = express()

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const Note = require('./models/note')


app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/', (request, response) => {
  response.json('<h1>Hello</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => response.json(notes))
})

app.get('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  Note.findById(id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.state(404)
      }
    })
    .catch((error) => next(error))
})

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  if (!body.content) {
    return response.status(404).json({
      error: 'content missing',
    })
  }

  const newNote = new Note({
    content: body.content,
    important: body.important || false,
  })

  newNote
    .save()
    .then((newNote) => response.json(newNote))
    .catch((error) => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  Note.findById(id)
    .then((note) => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = body.content
      note.important = body.important

      return note.save().then(response.status(200).json(note))
    })
    .catch((error) => next(error))
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  Note.findByIdAndDelete(id).then(response.status(204).end())
})


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () =>
  logger.info(`Server running on port ${process.env.PORT}`),
)
