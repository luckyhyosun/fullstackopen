import { useState } from 'react'

const Newblog = (props) => {
  const [title, setBlogTitle] = useState('')
  const [author, setBlogAuthor] = useState('')
  const [url, setBlogUrl] = useState('')

  const handleNewblog = event => {
    event.preventDefault()

    props.createBlog({
      title,
      author,
      url
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div className="newBlogform">
      <h2>Create a new blog</h2>
      <form onSubmit={handleNewblog}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </label>

        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </label>

        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </label>
        <button type="submit" className="functionalBtn">Create</button>
      </form>
    </div>
  )
}

export default Newblog
