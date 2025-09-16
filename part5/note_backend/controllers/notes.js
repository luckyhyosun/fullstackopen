// router for Note only
const jwt = require('jsonwebtoken')
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

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.post('/', async (request, response) => {
  const { content, important } = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

  if(!decodedToken.id){
    return response.status(401).json({
      error: 'token invalid'
    })
  }

  const user = await User.findById(decodedToken.id)

  if(!user){
    return response.status(400).json({
      error: 'user missing or not valid'
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
  const id = request.params.id

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if(!decodedToken.id){return response.status(401).json({ error: 'token invalid' }) }
  const user = await User.findById(decodedToken.id)
  if(!user){return response.status(404).json({ error: 'user not authorized' })}
  const note = await Note.findById(id)
  if(!note){return response.status(404).json({ error: 'can not find the Note' })}

  // console.log(note.user._id.toString())
  // console.log(user.id);
  // console.log(decodedToken.id);

  if(note.user._id.toString() !== decodedToken.id){
    return response.status(500).json({ error: 'only the original writer can delete the note!' })
  }

  const deletedNote = await Note.findByIdAndDelete(id)

  user.notes = user.notes.filter(note => note._id.toString() !== id)
  await user.save()

  return response.status(200).json(deletedNote)
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
