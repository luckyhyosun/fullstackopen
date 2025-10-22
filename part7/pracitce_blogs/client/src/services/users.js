import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const signup = async (userdata) => {
  const response = await axios.post(baseUrl, userdata)
  return response.data
}

export default { signup }
