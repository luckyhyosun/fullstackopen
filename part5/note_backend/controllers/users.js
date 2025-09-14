// router for User only
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', { content: 1, important: 1 })
  response.status(200).json(users)
})

userRouter.post('/', async (request, response) => {
  const { id, name, pw } = request.body

  const saltRounds = 10
  const hashpw = await bcrypt.hash(pw, saltRounds)

  const newUser = new User({
    id,
    name,
    passwordHash: hashpw
  })

  const savedUser = await newUser.save()
  response.status(200).json(savedUser)
})

module.exports = userRouter
