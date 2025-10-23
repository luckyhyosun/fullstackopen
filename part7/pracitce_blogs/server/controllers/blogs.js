const blogRouter = require('express').Router()
const Blog = require('../models/blogs')

blogRouter.post('/', async(req, res) => {
  const {title, content} = req.body

  const newBlog = new Blog({
    title,
    content
  })

  const savedNewBlog = await newBlog.save()
  res.status(200).json(savedNewBlog)
})

module.exports = blogRouter
