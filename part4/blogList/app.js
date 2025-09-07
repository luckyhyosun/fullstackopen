const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogRouters')
const userRouter = require('./controllers/userRouters')

const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error.message))

app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

module.exports = app
