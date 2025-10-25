const blogRouter = require('express').Router()
const Blog = require('../models/blogs')

const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async(req, res) => {
  const allBlogs = await Blog.find()
  res.status(200).json(allBlogs)
})

blogRouter.post('/', userExtractor, async(req, res) => {
  const {title, content} = req.body
  const user = req.user

  const newBlog = new Blog({
    title,
    content
  })

  if(!user){
    return res.status(400).json('userId missing or not valid')
  }

  const savedNewBlog = await newBlog.save()
  res.status(200).json(savedNewBlog)
})

module.exports = blogRouter
