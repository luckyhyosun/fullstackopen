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

  const blog = new Blog(body)
  blog.likes = blog.likes | 0
  blog.user = user._id

  if(!user){
    return response.status(400).json({ error: 'userId missing or not valid'})
  }

  if (!blog.title || !blog.url) {
    return response
      .status(400)
      .json({ error: 'Bad Request: Property is missing' })
  }

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(blog._id)
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

  const blog = await Blog.findById(id)
  if(!blog){
    return res.status(404).end()
  }

  blog.title = body.title
  blog.author = body.author
  blog.url = body.url
  blog.likes = body.likes

  const updatedBlog = await blog.save()

  res.status(200).json(updatedBlog)
})

module.exports = blogRouter
