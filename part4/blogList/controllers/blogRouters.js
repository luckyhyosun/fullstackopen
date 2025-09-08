const blogRouter = require('express').Router()
const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})

  return response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  // const user = await User.findById(body.userId)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
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

blogRouter.delete('/:blogid', async (request, response) => {
  const blogid = request.params.blogid
  const foundBlog = await Blog.findById(blogid)
  // console.log(foundBlog.user.toString())

  if(!foundBlog){
    return response.status(404).json({ error: 'blog not found' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // console.log(decodedToken.id)

  if(foundBlog.user.toString() === decodedToken.id){
    await Blog.findByIdAndDelete(blogid)
    response.status(204).end()
  }else{
    return response.status(401).json({ error: 'token or user is invalid' })
  }
})

blogRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const body = req.body

  await Blog.findByIdAndUpdate(id, body)
  res.status(204).end()
})

module.exports = blogRouter
