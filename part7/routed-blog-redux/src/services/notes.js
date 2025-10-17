import axios from 'axios'

const baseUrl = 'http://localhost:3000/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNote = async (userId, content) => {
  const newNote = { content, important: false, likes: 0, userId}
  const response = await axios.post(baseUrl, newNote)
  return response.data
}

const updateNote = async (obj) => {
  const updatedNote = {...obj, likes: obj.likes+1}
  const response = await axios.put(`${baseUrl}/${obj.id}`, updatedNote)
  return response.data
}

const deleteNote = async (obj) => {
  const response = await axios.delete(`${baseUrl}/${obj.id}`)
  return response.data
}

export default { getAll, addNote, updateNote, deleteNote }
