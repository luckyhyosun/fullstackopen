const BlogDetail = ({ blog }) => {
  return (
    <div>
      <p>author: {blog.author}</p>
      <p>likes: {blog.likes}</p>
      <p>url: <a href={blog.url}>{blog.url}</a></p>
    </div>
  )
}

export default BlogDetail
