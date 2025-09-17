import { useState } from 'react'

const BlogDetail = ({ blog, updateBlog }) => {
  const [likes, setLikes] = useState(blog.likes)

  const likeStyle ={
    display: 'inline',
    border: 'none',
    backgroundColor: 'white',
    fontSize: '20px',
    cursor: 'pointer'
  }

  const handleLikes = () => {
    const updatedLikes = likes + 1
    setLikes(updatedLikes)

    updateBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      likes: updatedLikes,
      url: blog.url,
      user: blog.user
    })
  }

  return (
    <div>
      <p>author: {blog.author}</p>
      <p style={{ display: 'inline' }}>likes: {likes}</p>
      <button style={likeStyle} onClick={handleLikes}>👍</button>
      <p>url: <a href={blog.url}>{blog.url}</a></p>
    </div>
  )
}

export default BlogDetail
