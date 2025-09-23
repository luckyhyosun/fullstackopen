const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.get('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'fullstack',
        username: 'kim',
        password: 'good'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('Login Form')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'kim', 'good')
      await expect(page.getByText('Hello, fullstack! 👋')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'kim', 'bad')
      await expect(page.getByText('not valid username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'kim', 'good')
      await expect(page.getByText('Hello, fullstack! 👋')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'Blog playwright test',
        'A fullstack developer',
        'helloworld.com'
      )
      await expect(page.getByText('Blog playwright test by A fullstack developer')).toBeVisible()
    })
  })
})
