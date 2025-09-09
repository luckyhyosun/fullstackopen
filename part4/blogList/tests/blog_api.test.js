const assert = require('node:assert')
const { test, before, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const helper = require('../tests/blog_helper.test')
const Blog = require('../models/blogModel')
const User = require('../models/userModel')

const api = supertest(app)

const testUser = {
  name: 'hello',
  username: 'hellotest',
  password: 'hellopassword'
}

let TOKEN
let userId

describe('when there is initially some blogs saved', () => {
  before(async () => {
    await User.deleteMany({})
    let response = await api.post('/api/users').send(testUser)
    userId = response.body.id

    response = await api.post('/api/login').send(testUser)
    TOKEN = response.body.token
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(
      helper.initialBlogs.map(blog => ({ ...blog, user: userId }))
    )
  })

  test('blog lists are returned as json', async () => {
    const result = await api
      .get('/api/blogs')
      .set({ Authorization: `Bearer ${TOKEN}` })
    assert.strictEqual(result.body.length, helper.initialBlogs.length)
  })

  test('succeeds with verifying that the unique identifier property', async () => {
    const response = await api
      .get('/api/blogs')
      .set({ Authorization: `Bearer ${TOKEN}` })
    const blogs = response.body

    blogs.forEach((blog) => {
      assert.ok(blog.id, 'id property is missing')
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
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsInDb = await helper.blogsInDb()
      assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)

      const checkBlogTitlesInDb = blogsInDb.map((blog) => blog.title)
      assert(checkBlogTitlesInDb.includes('REST Chapter 5'))
    })

    test('likes attribute get default value 0 if not passed with request', async () => {
      const newBlog = {
        title: 'The Beginner Guide to React',
        author: 'Kent C. Dodds',
        url: 'https://egghead.io/courses/the-beginner-s-guide-to-react',
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsInDb = await helper.blogsInDb()
      assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)

      const checkBlogTitlesInDb = blogsInDb.map((blog) => blog.author)
      assert(checkBlogTitlesInDb.includes('Kent C. Dodds'))
    })

    test('fails with statuscode 401 if token is missing', async () => {
      const newBlog = {
        title: 'REST Chapter 5',
        author: 'Roy Thomas Fielding',
        url: 'https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm¡',
        likes: 100,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })
  })

  describe('viewing a specific blog', () => {
    test('fails with statuscode 400 if title or url does not exist', async () => {
      const newBlog = {
        title: 'Class Components Fundamentals',
        author: 'Joe Maddalone',
        // url: 'https://egghead.io/courses/react-with-class-components-fundamentals-4351f8bb',
        likes: 8,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const blogsInDb = await helper.blogsInDb()
      assert.strictEqual(blogsInDb.length, helper.initialBlogs.length)
    })

    test('succeeds with updating number of likes for a blog post with id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const editedBlog = {
        title: 'Updated Title',
        author: 'Updated Author',
        url: 'Updated url',
        likes: 77
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(editedBlog)
        .expect(200)

      const updatedBlog = await Blog.findById(blogToUpdate.id)

      assert.strictEqual(updatedBlog.likes, editedBlog.likes)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsInDb = await helper.blogsInDb()
      const blogToDelete = blogsInDb[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${TOKEN}`).expect(204)

      const allBlogs = await helper.blogsInDb()
      const blogs = allBlogs.map((blog) => blog.title)

      assert(!blogs.includes(blogToDelete.title))
      assert.strictEqual(allBlogs.length, helper.initialBlogs.length - 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
