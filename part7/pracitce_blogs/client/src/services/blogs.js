import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

const createBlog = async ({title, content}) => {
  const response = await axios.post(baseUrl, {title, content})
  return response.data
}

export default { createBlog }
