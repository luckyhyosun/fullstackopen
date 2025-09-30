import axios from 'axios'

export const getNotes = async () => {
  await axios.get('http://localhost:3001/notes').then(res => res.data)
}
