import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/employees'

const employeeApi = {
  getAll: (keyword = '') =>
    axios.get(BASE_URL, { params: keyword ? { keyword } : {} }),

  getById: (id) => axios.get(`${BASE_URL}/${id}`),

  create: (data) => axios.post(BASE_URL, data),

  update: (id, data) => axios.put(`${BASE_URL}/${id}`, data),

  remove: (id) => axios.delete(`${BASE_URL}/${id}`),
}

export default employeeApi
