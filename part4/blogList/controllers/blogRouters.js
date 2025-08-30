const blogRouter = require('express').Router()
const Blog = require('../models/blogModel')

blogRouter.get('/', async (request, response) => {
  //Returns an array of Mongoose documents, not Promise ojbect.
  const blogs = await Blog.find({})
  //Express uses JSON.stringify internally.
  return response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  if(!body.title || !body.url){
    return response.status(400).json({ error: 'Bad Request: Property is missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogRouter
