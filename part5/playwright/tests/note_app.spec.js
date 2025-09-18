const { test, describe, expect } = require('@playwright/test')

describe('Note app', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5173')

    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app by Lucky, Media Technology, Computer Science, KTH 2025')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await page.goto('http://localhost:5173')

    await page.getByRole('button', { name: 'Login' }).click()
    const textboxes = await page.getByRole('textbox').all()
    await textboxes[0].fill('developer')
    await textboxes[1].fill('good')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Hello, hyosun! 👋')).toBeVisible()
  })
})
