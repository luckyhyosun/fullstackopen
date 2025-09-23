import Togglable from './Togglable'
import BlogDetail from './BlogDetail'

const Blog = ({ blog, handleDelete, updateBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 20
  }

  const hideBtn = {
    display : 'none'
  }

  const showBtn = {
    display : 'inline'
  }

  return (
    <div style={blogStyle}>
      <h3 style={{ display: 'inline' }}>{blog.title}</h3>
      <button
        onClick={handleDelete}
        style={user? showBtn : hideBtn}>
        Delete
      </button>

      <Togglable buttonLabel="More...">
        <BlogDetail blog={blog} updateBlog={updateBlog}/>
      </Togglable>
    </div>
  )
}

export default Blog
