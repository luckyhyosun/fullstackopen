const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/userModel')

userRouter.get('/', async (req, res) => {
  const allUsers = await User.find({}).select('-passwordHash')
  res.status(200).json(allUsers)
})

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if(!username){
    return res.status(400).end()
  }

  if(!password || password.length < 4){
    return res.status(400).end()
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = userRouter
