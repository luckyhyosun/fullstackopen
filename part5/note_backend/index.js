require('dotenv').config()
// const cors = require('cors')
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

//allow all origins
//app.use(cors())

// only allow this frontend
// app.use(cors({
//   origin: 'http://localhost:5173'
// }));

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.get('/', (request, response) => {
    response.json('<h1>Hello</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => response.json(notes))
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    Note.findById(id).then(note => response.json(note))
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${process.env.PORT}`))
