const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Note app', () => {
  beforeEach(async ({ page, request}) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        pw: 'joy'
      }
    })

    await page.goto('/')
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

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'Playwright test')
      await expect(page.getByText('Playwright test')).toBeVisible()
    })

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'another note by playwright')
        await expect(page.getByText('another note by playwright')).toBeVisible()
      })

      test('importance can be changed', async ({ page }) => {
        await page.getByRole('button', { name: '🔁 Not important' }).click()
        await expect(page.getByText('🔁 Important')).toBeVisible()
      })
    })

    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note')
        await createNote(page, 'second note')
        await createNote(page, 'third note')
      })

      test.only('one of those can be made nonimportant', async ({ page }) => {
        const otherNoteText = page.getByText('second note')
        const otherNoteElement = otherNoteText.locator('..')

        await otherNoteElement.getByRole('button', { name: '🔁 Not important' }).click()
        await expect(otherNoteElement.getByText('🔁 Important')).toBeVisible()
      })
    })
  })
})
