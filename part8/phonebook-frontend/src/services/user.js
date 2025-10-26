import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/users'

const addUser = async ({username, contact}) => {
  const response = await axios.post(baseUrl, {username, contact})
  return response.data
}

export default { addUser }
