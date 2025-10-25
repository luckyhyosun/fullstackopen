import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const config = {headers: { Authorization: token }}

const allBlogs = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data
}

const createBlog = async ({title, content}) => {

  const response = await axios.post(baseUrl, {title, content}, config)
  return response.data
}

export default { setToken, allBlogs, createBlog }
