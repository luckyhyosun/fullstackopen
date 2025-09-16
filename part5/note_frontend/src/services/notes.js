import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const create = async newObj => {
  const config = { headers: { Authorization: token } }
  const response =  await axios.post(baseUrl, newObj, config)
  return response.data
}

const update = (id, updatedObj) => {
  return axios
    .put(`${baseUrl}/${id}`, updatedObj)
    .then(response => response.data)
}

const remove = async id => {
  try{
    const config = { headers: { Authorization: token } }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  }catch(error){
    throw error.response.data.error
  }
}

export default {
  getAll,
  create,
  update,
  remove,
  setToken
}
