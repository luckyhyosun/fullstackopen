const UserRouter = require('express').Router()
const User = require('../models/user')

UserRouter.get('/', async (req, res) => {
  const allUsers = await User.find({})
  res.status(200).json(allUsers)
})

UserRouter.post('/', async (req, res) => {
  const {username, contact} = req.body

  const newUser = new User({username, contact})
  const savedUser = await newUser.save()
    res.status(200).json(savedUser)
})

module.exports = UserRouter
