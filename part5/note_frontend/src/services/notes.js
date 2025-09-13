import axios from 'axios'
const baseUrl = '/api/notes'

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

const remove = id => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then(response => response.data)
}

export default {
    getAll,
    create,
    update,
    remove
}
