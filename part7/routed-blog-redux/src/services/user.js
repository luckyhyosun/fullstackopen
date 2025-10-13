import axios from 'axios'

const baseUrl = 'http://localhost:3000/loginUser'

const allUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { allUsers }
