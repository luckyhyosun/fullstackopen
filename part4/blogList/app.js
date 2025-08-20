const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogRouter')

const app = express()

console.log('connecting to ', config.MONGODB_URI);

mongoose
    .connect(config.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log(error.message))

app.use(express.json())
app.use('api/blogs', blogRouter)

module.exports = app
