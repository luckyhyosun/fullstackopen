const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const helper = require('../tests/blog_helper.test')
const User = require('../models/userModel')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('a valid user can be added', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'firstUser',
      name: 'firstname',
      password: 'firsthello'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  })

  test('user lists are returned as json', async () => {
    const usersAtStart = await helper.usersInDb()

    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  describe('viewing a specific user', () => {
    test('fails with statuscode 400 if username does not exist', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        name: 'newuser',
        password: 'newpw'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const userAtEnd = await helper.usersInDb()
      assert.strictEqual(userAtEnd.length, usersAtStart.length)
    })

    test('fails with status 400 if password is less than 3 characters', async () => {
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
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('same username can not be added twice', async () => {
      const newUser = {
        username: 'firstUser',
        name: 'secondname',
        password: 'secondhello'
      }
      await api.post('/api/users').send(newUser)
      const usersAtStart = await helper.usersInDb()

      await api.post('/api/users').send(newUser).expect(400)
      const usersAtEnd = await helper.usersInDb()

      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
