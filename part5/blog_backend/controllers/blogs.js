const blogRouter = require('express').Router()
const Blog = require('../models/Blog')

blogRouter.get('/', async (req, res) => {
  const notes = await Blog.find({})
  return res.status(200).json(notes)
})

module.exports = blogRouter
