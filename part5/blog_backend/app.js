const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')

console.log('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message))

const app = express()

app.use(express.json())

app.use(express.static('dist'))
app.use('/api/blogs', blogRouter)
app.use('/api/login', loginRouter)

if(process.env.NODE_ENV === 'test'){
  app.use('/api/testing', testingRouter)
}

module.exports = app
