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
      await expect(page.getByText('by A fullstack developer')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          'Another Blog test',
          'luckyKim',
          'hellobonjour.com'
        )
        await expect(page.getByText('by luckyKim')).toBeVisible()
      })

      test('the like value can be changed', async ({ page }) => {
        await page.getByRole('button', {name: 'More...'}).click()
        await page.getByRole('button', {name: '👍'}).click()
        await expect(page.getByText('likes: 1')).toBeVisible()
      })

      describe('not valid user tries', () => {
        beforeEach(async ({ page }) => {
          await page.getByRole('button', {name: 'Logout'}).click()
          await expect(page.getByText('Login Form')).toBeVisible()
        })

        test('to delete the blog', async ({ page }) => {
          await page.getByRole('button', {name: 'Delete'}).click()
          await expect(page.getByText('only logged-in user can delete blog!')).toBeVisible()
        })
      })
    })
  })
})
