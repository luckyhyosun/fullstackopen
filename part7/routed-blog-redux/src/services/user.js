import axios from 'axios'

const baseUrl = 'http://localhost:3000/loginUser'

const postUser = async (username) => {
  const response = await axios.post(baseUrl, { username })
  return response.data
}

export default { postUser }
