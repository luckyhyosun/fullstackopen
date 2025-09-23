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

  // to fix timing issue
  const blogDiv = page.locator('.blogList').filter({ hasText: title })
  await blogDiv.getByText(title).waitFor()
}

const filterBlog = async (page, title) => {
  const blogDiv = page.locator('.blogList').filter({ hasText: title })
  await blogDiv.getByRole('button', {name: 'More...'}).click()
  return blogDiv
}
const clickLike = async (blogDiv) => {
  await blogDiv.getByRole('button', {name: '👍'}).click()
}

export {loginWith, createBlog, filterBlog, clickLike}
