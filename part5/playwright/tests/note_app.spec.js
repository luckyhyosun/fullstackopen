const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Note app', () => {
  beforeEach(async ({ page, request}) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        pw: 'joy'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app by Lucky, Media Technology, Computer Science, KTH 2025')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'wrong')

    const errorDiv = page.locator('.error')
    await expect(errorDiv).toContainText('wrong credentials')

    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)') // in CSS file, "color: red;""
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'joy')
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })

    // test('a new note can be created', async ({ page }) => {
    //   await page.getByRole('button', { name: 'New note' }).click()
    //   await page.getByRole('textbox').fill('Playwright test')
    //   await page.getByRole('button', { name: 'save'}).click()
    //   await expect(page.getByText('Playwright test')).toBeVisible()
    // })

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'New note' }).click()
        await page.getByRole('textbox').fill('another note by playwright')
        await page.getByRole('button', { name: 'save'}).click()
        await expect(page.getByText('another note by playwright')).toBeVisible({ timeout: 50000})
      })

      test('importance can be changed', async ({ page }) => {
        await page.getByRole('button', { name: '🔁 Not important' }).click()
        await expect(page.getByText('🔁 Important')).toBeVisible()
      })
    })
  })
})
