const { default: axios } = require('axios')

const authApi = axios.create({
  baseURL: 'https://localhost:7124/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default authApi
