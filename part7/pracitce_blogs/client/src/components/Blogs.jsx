import { useState } from 'react'
import blogService from '../services/blogs'

const Blogs = () => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogContent, setBlogContent] = useState('')

  const onHandleCreateBlog = async (e) => {
    e.preventDefault()
    const newBlog = await blogService.createBlog({title: blogTitle, content: blogContent})
    console.log(newBlog);
  }

  return (
    <>
      <h1>Blogs</h1>

      <h2>Create Blogs</h2>
      <form onSubmit={onHandleCreateBlog}>
        <label htmlFor="blogTitle">Title: </label>
        <input type="text" id="blogTitle" value={blogTitle} onChange={({target}) => setBlogTitle(target.value)}/>
        <br />
        <label htmlFor="blogContent">Content: </label>
        <textarea type="textfield" id="blogContent" value={blogContent} onChange={({target}) => setBlogContent(target.value)}/>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default Blogs
