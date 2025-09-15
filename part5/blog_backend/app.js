require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

console.log('connecting to', process.env.MONGODB_URI)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message))


const app = express()

module.exports = app
