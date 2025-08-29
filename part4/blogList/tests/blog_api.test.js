const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../tests/blog_helper.test')
const Blog = require('../models/blogModel')

const api = supertest(app)

beforeEach(async () => {
  console.log('Blog List Test Started')
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test.only('blog lists are returned as json', async () => {
  console.log('blog lists are returned as json')
})

after(async () => {
  console.log('Blog List Test Ended')
  await mongoose.connection.close()
})
