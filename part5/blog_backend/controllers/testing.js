const testingRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

testingRouter.get('/reset', async (req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter
