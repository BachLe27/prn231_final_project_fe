import axios from 'axios'

const publicApi = axios.create({
  baseURL: 'https://localhost:7124/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default publicApi
