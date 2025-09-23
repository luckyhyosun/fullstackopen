const { test, expect, beforeEach, describe } = require('@playwright/test')

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
      await page.getByLabel('Username:').fill('kim')
      await page.getByLabel('Password:').fill('good')
      await page.getByRole('button', {name: 'Login'}).click()
      await expect(page.getByText('Hello, fullstack! 👋')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('Username:').fill('kim')
      await page.getByLabel('Password:').fill('bad')
      await page.getByRole('button', {name: 'Login'}).click()
      await expect(page.getByText('not valid username or password')).toBeVisible()
    })
  })
})
