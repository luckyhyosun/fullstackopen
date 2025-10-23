const blogRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogRouter.post('/', async(req, res) => {
  const {title, content} = req.body

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  console.log(decodedToken);

  if(!decodedToken.id){
    return res.status(401).json('token invalid')
  }

  const user = User.findById(decodedToken.id)
  if (!user) {
    return response.status(400).json('UserId missing or not valid')
  }

  const newBlog = new Blog({
    title,
    content
  })

  const savedNewBlog = await newBlog.save()
  res.status(200).json(savedNewBlog)
})

module.exports = blogRouter
