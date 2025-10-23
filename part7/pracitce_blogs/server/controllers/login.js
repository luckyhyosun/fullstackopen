const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async(req, res) => {
  const {username, password} = req.body

  const user = await User.findOne({ username: username })
  const isUserPasswordCorrect = user !== null
    ? await bcrypt.compare(password, user.passwordHash)
    : false

  if(!(user && isUserPasswordCorrect)){
    return res.status(401).json({
      error: 'Unauthorized Error: invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(200).send({token, username: user.username})
})

module.exports = loginRouter
