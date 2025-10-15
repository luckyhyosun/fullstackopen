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

export default { allUser, addUser }
