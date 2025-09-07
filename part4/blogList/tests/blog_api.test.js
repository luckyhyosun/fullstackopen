const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const helper = require('../tests/blog_helper.test')
const Blog = require('../models/blogModel')
const User = require('../models/userModel')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blog lists are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  describe('viewing a specific blog', () => {
    test('succeeds with verifying that the unique identifier property', async () => {
      const response = await api.get('/api/blogs')
      const blogs = response.body

      blogs.forEach((blog) => {
        assert.ok(blog.id, 'id property is missing')
      })
    })

    test('fails with statuscode 400 if title or url does not exist', async () => {
      const newBlog = {
        title: 'Class Components Fundamentals',
        author: 'Joe Maddalone',
        // url: 'https://egghead.io/courses/react-with-class-components-fundamentals-4351f8bb',
        likes: 8,
      }

      await api.post('/api/blogs').send(newBlog).expect(400)

      const blogsInDb = await helper.blogsInDb()
      assert.strictEqual(blogsInDb.length, helper.initialBlogs.length)
    })

    test('fails with statuscode 400 if likes property does not exist', async () => {
      const newBlog = {
        title: 'The Beginner Guide to React',
        author: 'Kent C. Dodds',
        url: 'https://egghead.io/courses/the-beginner-s-guide-to-react',
      }

      if (!newBlog.likes) {
        const blog = { ...newBlog, likes: 0 }
        await api.post('/api/blogs').send(blog).expect(201)
      }

      const blogsInDb = await helper.blogsInDb()
      assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)

      const checkBlogTitlesInDb = blogsInDb.map((blog) => blog.author)
      assert(checkBlogTitlesInDb.includes('Kent C. Dodds'))
    })

    test('succeeds with updating number of likes for a blog post with id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const updatedProperty = { likes: 100 }

      await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedProperty)

      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlog = blogsAtEnd[0]
      assert.strictEqual(updatedBlog.likes, 100)
    })
  })

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
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

      const checkBlogTitlesInDb = blogsInDb.map((blog) => blog.title)
      assert(checkBlogTitlesInDb.includes('REST Chapter 5'))
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsInDb = await helper.blogsInDb()
      const blogToDelete = blogsInDb[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const allBlogs = await helper.blogsInDb()
      const blogs = allBlogs.map((blog) => blog.title)

      assert(!blogs.includes(blogToDelete.title))
      assert.strictEqual(allBlogs.length, helper.initialBlogs.length - 1)
    })
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('testpw', 10)
    const user = new User({
      username: 'firstUser',
      name: 'newuser',
      passwordHash })

    await user.save()
  })

  test.only('user lists are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  describe('viewing a specific user', () => {
    test.only('fails with statuscode 400 if username does not exist', async () => {
      const usersAtStart = await helper.usersInDb()

      const passwordHash = await bcrypt.hash('testpw2', 10)
      const newUser = {
        name: 'newuser',
        passwordHash
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const userAtEnd = await helper.usersInDb()
      assert.strictEqual(userAtEnd.length, usersAtStart.length)
    })

    test.only('fails with status 400 if password is less than 3 characters', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'testUser',
        name: 'newUser',
        password: 'de'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
