const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/User')

userRouter.post('/', async (req, res) => {
  const {username, name, password} = req.body

  const saltRounds = 10
  const hashpw = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    name,
    passwordHash: hashpw
  })

  const savedUser = await newUser.save()
  res.status(200).json(savedUser)
})

module.exports = userRouter
