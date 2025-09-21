const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'Show login' }).click()
  await page.getByLabel('Username:').fill(username)
  await page.getByLabel('Password:').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

const createNote = async (page, text) => {
  await page.getByRole('button', { name: 'New note' }).click()
  await page.getByRole('textbox').fill(text)
  await page.getByRole('button', { name: 'save' }).click()
  await page.getByText(text).waitFor()
}

export { loginWith, createNote }
