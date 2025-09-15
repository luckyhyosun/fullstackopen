const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/Blog')

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

  console.log(decodedToken)

  const newBlog = new Blog({
    title,
    author,
    url
  })

  const savedBlog = await newBlog.save()
  return res.status(201).json(savedBlog)
})

module.exports = blogRouter
