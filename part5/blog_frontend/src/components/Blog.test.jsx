import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('<Blog /> component rendering with <BlogDetail /> comp', () => {
  const blogDetail = {
    title: 'Test title for Blog',
    author: 'Kim developer',
    likes: 0,
    url: 'hello.com',
    user: 'id1024'
  }

  render(
    <div>
      <Blog blog={blogDetail} />
    </div>
  )

  const title = screen.getByText('Test title for Blog')
  const author = screen.getByText('author: Kim developer')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
})
