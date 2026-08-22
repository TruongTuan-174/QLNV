import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/positions'

const positionApi = {
  getAll: () => axios.get(BASE_URL),
  create: (data) => axios.post(BASE_URL, data),
}

export default positionApi
