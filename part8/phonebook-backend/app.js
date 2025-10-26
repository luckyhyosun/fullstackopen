const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const cors = require('cors')
const UserRouter = require('./controllers/users')

const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log('✅ connected to MongoDB'))
  .catch(error => console.log('‼️ error connecting to MongoDB:', error.message))

app.use(express.json())
app.use(cors())
app.use('/api/users', UserRouter)

module.exports = app
