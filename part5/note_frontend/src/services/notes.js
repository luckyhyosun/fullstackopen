import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    return axios
      .get(baseUrl)
      .then(response => response.data)
}

const create = newObj => {
    return axios
      .post(baseUrl, newObj)
      .then(response => response.data)
}

const update = (id, updatedObj) => {
    return axios
      .put(`${baseUrl}/${id}`, updatedObj)
      .then(response => response.data)
}

export default {
    getAll,
    create,
    update
}
