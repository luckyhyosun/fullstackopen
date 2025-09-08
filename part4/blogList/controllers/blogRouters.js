const blogRouter = require('express').Router()
const Blog = require('../models/blogModel')
const User = require('../models/userModel')

blogRouter.get('/', async (request, response) => {
  //Returns an array of Mongoose documents, not Promise ojbect.
  const blogs = await Blog.find({})
  //Express uses JSON.stringify internally.
  return response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)

  if(!user){
    return response.status(400).json({ error: 'userId missing or not valid'})
  }

  if (!body.title || !body.url) {
    return response
      .status(400)
      .json({ error: 'Bad Request: Property is missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const body = req.body

  await Blog.findByIdAndUpdate(id, body)
  res.status(204).end()
})

module.exports = blogRouter
