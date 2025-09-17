import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  beforeEach(() => {
    render(
      <Togglable buttonLabel="show...">
        <div>togglable content</div>
      </Togglable>
    )
  })

  test('renders content', async () => {
    const note = {
      content: 'Component testing is done with react-testing-library',
      important: true
    }

    const mockHandler = vi.fn()

    render(<Note note={note} handelChangeImportant={mockHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText('🔁 Not important')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })

  test('renders its children', () => {
    screen.getByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    const element = screen.getByText('togglable content')
    expect(element).not.toBeVisible()
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const element = screen.getByText('togglable content')
    expect(element).toBeVisible()
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('Cancel')
    await user.click(closeButton)

    const element = screen.getByText('togglable content')
    expect(element).not.toBeVisible()
  })
})
