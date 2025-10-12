import axios from 'axios'

const baseUrl = 'http://localhost:3000/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNote = async (content) => {
  const newNote = { content, important: false }
  const response = await axios.post(baseUrl, newNote)
  return response.data
}

export default { getAll, addNote }
