const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogRouter.get('/', async (req, res) => {
  const notes = await Blog.find({})
  return res.status(200).json(notes)
})

blogRouter.post('/', async (req, res) => {
  const {title, author, url} = req.body

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)

  if(!decodedToken.id){
    return res.status(401).json({
      error: 'token invalid'
    })
  }

  const user = await User.findById(decodedToken.id).populate('blogs')

  if(!user){
    return response.status(400).json({
      error: 'user missing or not valid'
    })
  }

  const newBlog = new Blog({
    title,
    author,
    url,
    user: user.id
  })

  const savedBlog = await newBlog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return res.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
  const id = req.params.id

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)

  if(!decodedToken.id){
    return res.status(401).json({
      error: 'token invalid'
    })
  }
  const blog = await Blog.findById(id)

  if (!blog) {
    return res.status(404).json({
      error: 'blog not found'
    })
  }

  if(blog.user._id.toString() !== decodedToken.id){
    return res.status(401).json({
      error: 'user not authorized'
    })
  }

  const removedBlog = await Blog.findByIdAndDelete(id)

  const user = await User.findById(decodedToken.id)
  user.blogs = user.blogs.filter(blog => blog._id.toString() !== id)
  await user.save()

  return res.status(200).json(removedBlog)
})

module.exports = blogRouter
