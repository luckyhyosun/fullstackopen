import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const getAllUser = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const adduser = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const updateUser = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

const deleteUser = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {getAllUser, adduser, deleteUser, updateUser}
