const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res) => {
  const {username, password} = req.body

  const newUser = new User({
    username,
    password
  })

  const savedUser = await newUser.save()
  res.status(200).json(savedUser)
})

module.exports = userRouter
