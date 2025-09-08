const blogRouter = require('express').Router()
const Blog = require('../models/blogModel')

const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})

  return response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if(!user){
    return response.status(400).json({ error: 'userId missing or not valid'})
  }

  if (!body.title || !body.url) {
    return response
      .status(400)
      .json({ error: 'Bad Request: Property is missing' })
  }

  if (!request.token){
    return response
      .status(401)
      .json({ error: 'Unauthorized: Token is missing'})
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

  if(!foundBlog){
    return response.status(404).json({ error: 'blog not found' })
  }

  const user = request.user

  if(foundBlog.user.toString() === user.id){
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
