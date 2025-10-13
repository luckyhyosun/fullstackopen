import axios from 'axios'

const baseUrl = 'http://localhost:3000/loginUser'

const addUser = async (username) => {
  const newUser = {username}
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

export default { addUser }
