const loginWith = async (page, username, password) => {
  await page.getByLabel('Username:').fill(username)
  await page.getByLabel('Password:').fill(password)
  await page.getByRole('button', {name: 'Login'}).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', {name : 'Create Blog'}).click()
  await page.getByLabel('Title:').fill(title)
  await page.getByLabel('Author:').fill(author)
  await page.getByLabel('URL:').fill(url)
  await page.getByRole('button', {name: 'Create'}).click()
  // to fix strict mode violation: getByText(author) resolved to 2 elements
  // to fix timing issue
  await page.getByText('by ', author).waitFor()
}

export {loginWith, createBlog}
