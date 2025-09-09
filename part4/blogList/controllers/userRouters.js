const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/userModel')

userRouter.get('/', async (req, res) => {
  const allUsers = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})
  res.status(200).json(allUsers)
})

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if(!username){
    return res.status(400).json({
      error: 'Username is missing'
    })
  }

  const checkUser = await User.findOne({username: username})
  if(checkUser){
    return res.status(400).json({
      error: 'Same username can not be added'
    })
  }

  if(!password || password.length < 4){
    return res.status(400).json({
      error: 'Password is required and its minimum length is 3 characters'
    })
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
