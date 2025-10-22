const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const userRouter = require('./controllers/users')
const cors = require('cors')

const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message))

app.use(express.json())
app.use(cors())
app.use('/api/users', userRouter)

module.exports = app
