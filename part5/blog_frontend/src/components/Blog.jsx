const Blog = ({ blog, handleDelete, handleDetail }) => {
  const blogStyle = {
    width: 500,
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20
  }
  return (
    <div style={blogStyle}>
      <h3>{blog.title}</h3>
      by {blog.author}<button onClick={handleDetail}>More...</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default Blog
