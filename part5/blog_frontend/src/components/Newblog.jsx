const Newblog = (props) => {
  return (
    <div className="newBlogform">
      <h2>Create a new blog</h2>
      <form onSubmit={props.handleNewblog}>
        <label>
          Title:
          <input
            type="text"
            value={props.title}
            onChange={({ target }) => props.setBlogTitle(target.value)}
          />
        </label>

        <label>
          Author:
          <input
            type="text"
            value={props.author}
            onChange={({ target }) => props.setBlogAuthor(target.value)}
          />
        </label>

        <label>
          URL:
          <input
            type="text"
            value={props.url}
            onChange={({ target }) => props.setBlogUrl(target.value)}
          />
        </label>
        <button type="submit" className="functionalBtn">Create</button>
      </form>
    </div>
  )
}

export default Newblog
