const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../tests/blog_helper.test')
const Blog = require('../models/blogModel')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test.only('blog lists are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('verifies that the unique identifier property', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach(blog => {
    assert.ok(blog.id, 'id property is missing')
  })
})

test.only('creates a new blog post', async () => {
  const newBlog = {
    title: 'REST Chapter 5',
    author: 'Roy Thomas Fielding',
    url: 'https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm¡',
    likes: 100,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDb = await helper.blogsInDb()
  assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)

  const checkBlogTitlesInDb = blogsInDb.map(blog => blog.title)
  assert(checkBlogTitlesInDb.includes('REST Chapter 5'))
})

test.only('blog with missing likes number', async () => {
  const newBlog = {
    title: 'The Beginner Guide to React',
    author: 'Kent C. Dodds',
    url: 'https://egghead.io/courses/the-beginner-s-guide-to-react',
  }

  if(!newBlog.likes){
    const blog = {...newBlog, likes:0}
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
  }

  const blogsInDb = await helper.blogsInDb()
  assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)

  const checkBlogTitlesInDb = blogsInDb.map(blog => blog.author)
  assert(checkBlogTitlesInDb.includes('Kent C. Dodds'))

})

after(async () => {
  await mongoose.connection.close()
})
