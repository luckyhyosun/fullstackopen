// router for Note only
const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  response.status(200).json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

notesRouter.post('/', async (request, response) => {
  const { content, important, userId } = request.body

  const user = await User.findById(userId)

  if(!user){
    return response.status(400).json({
      error: 'userId missing or not valid'
    })
  }

  const note = new Note({
    content,
    important: important || false,
    user: user._id
  })

  const savedNote = await note.save()

  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {
  const deletedNote = await Note.findByIdAndDelete(request.params.id)
  response.status(204).json(deletedNote)
})

notesRouter.put('/:id', async (request, response) => {
  const { content, important } = request.body

  const note = await Note.findById(request.params.id)
  if (!note) {
    return response.status(404).end()
  }

  note.content = content
  note.important = important

  const updatedNote = await note.save()
  response.status(200).json(updatedNote)
})

module.exports = notesRouter
