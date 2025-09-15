const Blog = ({ blog, handleDelete }) => {
  return (
    <div>
      <h3>{blog.title}</h3>
      by {blog.author}
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default Blog
