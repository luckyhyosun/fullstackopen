import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentialData => {
  const response = await axios.post(baseUrl, credentialData )
  return response.data
}

export default { login }
