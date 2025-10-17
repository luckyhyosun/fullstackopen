import axios from 'axios'

const baseUrl = 'http://localhost:3000/users'

const allUser = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addUser = async (username, password) => {
  const newUser = {username, password, blogs:[]}
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

const updateUser = async (userId, noteObj) => {
  const newBlog = {
    id: noteObj.id,
    content: noteObj.content
  }

  const foundUser = await axios.get(`${baseUrl}/${userId}`)
  const updatedUserObj = {...foundUser, blogs: foundUser.data.blogs.push(newBlog)}

  const response = await axios.put(`${baseUrl}/${userId}`, updatedUserObj.data)
  return response.data
}

export default { allUser, addUser, updateUser}
