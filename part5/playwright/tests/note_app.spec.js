const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Note app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app by Lucky, Media Technology, Computer Science, KTH 2025')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'Login' }).click()
      await page.getByLabel('Username:').fill('developer')
      await page.getByLabel('Password:').fill('good')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Hello, hyosun! 👋')).toBeVisible()
    })

    test('a new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'New note' }).click()
      await page.getByRole('textbox').fill('Playwright test')
      await page.getByRole('button', { name: 'save'}).click()
      await expect(page.getByText('Playwright test')).toBeVisible()
    })
  })
})
