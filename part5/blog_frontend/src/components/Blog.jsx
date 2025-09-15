const Blog = ({ blog }) => {
  return (
    <div>
      <h3>{blog.title}</h3>
      by {blog.author}
    </div>
  )
}

export default Blog
