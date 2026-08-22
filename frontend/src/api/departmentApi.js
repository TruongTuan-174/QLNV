import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/departments'

const departmentApi = {
  getAll: () => axios.get(BASE_URL),
  create: (data) => axios.post(BASE_URL, data),
}

export default departmentApi
