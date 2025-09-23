const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, filterBlog, clickLike } = require('./helper')

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

      describe('not valid user', () => {
        beforeEach(async ({ page }) => {
          await page.getByRole('button', {name: 'Logout'}).click()
          await expect(page.getByText('Login Form')).toBeVisible()
        })

        test('tries to delete the blog', async ({ page }) => {
          await page.getByRole('button', {name: 'Delete'}).click()
          await expect(page.getByText('only logged-in user can delete blog!')).toBeVisible()
        })

        test('can not see the delete button', async ({ page }) => {
          const deleteBtn = page.locator('.hideBtn')
          await expect(deleteBtn).toBeHidden();
        })
      })
    })

    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          'First Blog',
          'frontend developer',
          'front.com'
        )
        await createBlog(
          page,
          'Second Blog',
          'backend developer',
          'back.com'
        )
        await createBlog(
          page,
          'Last Blog',
          'fullstack developer',
          'full.com'
        )
      })

      test('change likes value of multiple blogs', async ({ page }) => {
        const firstBlogDiv = await filterBlog(page, 'First Blog')
        const secondBlogDiv = await filterBlog(page, 'Second Blog')
        const lastBlogDiv = await filterBlog(page, 'Last Blog')

        await clickLike(firstBlogDiv)
        await clickLike(secondBlogDiv)
        await clickLike(secondBlogDiv)
        await clickLike(lastBlogDiv)
        await clickLike(lastBlogDiv)
        await clickLike(lastBlogDiv)
        await clickLike(lastBlogDiv)
      })
    })
  })
})
