import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Newblog from './Newblog'

test('<Newblog /> updates parent state and calls onSubmit', async () => {
  const createBlogObj = vi.fn()
  const user = userEvent.setup()

  render(<Newblog createBlog={createBlogObj}/>)

  const sendButton = screen.getByText('Create')
  expect(sendButton).toBeVisible()

  const title = screen.getByLabelText('Title:')
  await user.type(title, 'new title')

  const author = screen.getByLabelText('Author:')
  await user.type(author, 'hyosun')

  const url = screen.getByLabelText('URL:')
  await user.type(url, 'fullstack.com')

  // screen.debug()

  await user.click(sendButton)
  // console.log(createBlogObj.mock.calls)

  expect(createBlogObj.mock.calls).toHaveLength(1)
  expect(createBlogObj.mock.calls[0][0].title).toBe('new title')
})
