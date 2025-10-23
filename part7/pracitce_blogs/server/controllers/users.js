const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async(req, res) => {
  const allUsers = await User.find()
  res.status(200).json(allUsers)
})

userRouter.post('/', async (req, res) => {
  const {username, password} = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    passwordHash
  })

  const savedUser = await newUser.save()
  res.status(200).json(savedUser)
})

module.exports = userRouter
