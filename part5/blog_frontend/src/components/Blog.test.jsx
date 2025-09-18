import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogDetail from './BlogDetail'

describe('<Blog /> component rendering', () => {
  beforeEach(() => {
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
  })

  test('swho blog detail', () => {
    const title = screen.getByText('Test title for Blog')
    const author = screen.getByText(/Kim developer/, { exact: false })

    expect(title).toBeDefined()
    expect(author).toBeInTheDocument()
  })
})

describe('<Togglable /> component renering', () => {
  beforeEach(() => {
    render(
      <Togglable buttonLabel="More...">
      </Togglable>
    )
  })

  test('after clicking the button, children are displayed', async () => {
    const blogDetail = {
      likes: 0,
      url: 'hello.com'
    }

    render(<BlogDetail blog={blogDetail} />)

    const user = userEvent.setup()
    const button = screen.getByText('More...')

    await user.click(button)
    const likes = screen.getByText('likes: 0')
    const url = screen.getByText(/hello.com/, { exact : false })

    expect(likes).toBeVisible()
    expect(url).toBeVisible()
  })

  test('click like button twice', async () => {
    const blogDetail = {
      likes: 0,
      url: 'hello.com'
    }

    const updateLike = vi.fn()
    const user = userEvent.setup()

    render (<BlogDetail blog={blogDetail} updateBlog={updateLike}/>)

    const updateButton = screen.getByText('👍')
    expect(updateButton).toBeVisible()

    await user.click(updateButton)
    await user.click(updateButton)
    const updatedLike = screen.getByText('likes: 2')
    expect(updatedLike).toBeVisible()
  })
})
