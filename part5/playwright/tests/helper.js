const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'Show login' }).click()
  await page.getByLabel('Username:').fill(username)
  await page.getByLabel('Password:').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

export { loginWith }
