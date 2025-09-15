const blogRouter = require('express').Router()
const Blog = require('../models/Blog')

blogRouter.get('/', async (req, res) => {
  const notes = await Blog.find({})
  return res.status(200).json(notes)
})

blogRouter.post('/', async (req, res) => {
  const {title, author, url} = req.body

  const newBlog = new Blog({
    title,
    author,
    url
  })

  const savedBlog = await newBlog.save()
  return res.status(201).json(savedBlog)
})

module.exports = blogRouter
