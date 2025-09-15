require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')

console.log('connecting to', process.env.MONGODB_URI)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message))

const app = express()

app.use(express.json())

app.use(express.static('dist'))
app.use('/api/blogs', blogRouter)
app.use('/api/login', loginRouter)

module.exports = app
