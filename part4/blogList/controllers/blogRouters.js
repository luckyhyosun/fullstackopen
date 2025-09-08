const blogRouter = require('express').Router()
const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})

  return response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  // const user = await User.findById(body.userId)
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  console.log(decodedToken)

  if(!decodedToken.id){
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

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
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

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
