import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentialData => {
  try{
    const response = await axios.post(baseUrl, credentialData )
    return response.data
  }catch(error){
    throw error.response.data.error
  }
}

export default { login }
