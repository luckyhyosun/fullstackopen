const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const blogRouter = require('./controllers/blogs')
const cors = require('cors')
const middleware = require('./utils/middleware')

const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message))

app.use(express.json())
app.use(cors())
// without specifying a path,
// the middleware runs for every request to your application, regardless of which router handles it.
app.use(middleware.tokenExtractor)

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
// Middleware comes before router
app.use('/api/blogs', middleware.userExtractor, blogRouter)

module.exports = app
