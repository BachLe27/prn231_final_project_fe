import authApi from '../config/authApi'
import publicApi from '../config/publicApi'

export const getStudents = () =>
  publicApi({
    method: 'GET',
    url: '/Student'
  })

