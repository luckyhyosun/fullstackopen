import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNote = async content => {
  const newNote = { content, important: true}
  const response = await axios.post(baseUrl, newNote)
  return response.data
}

export default { getAll, createNote }
