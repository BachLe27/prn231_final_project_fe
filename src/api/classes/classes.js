import authApi from '../config/authApi'
import publicApi from '../config/publicApi'

export const getClasses = () =>
  authApi({
    method: 'GET',
    url: '/Classes'
  })

export const getClassById = (id) =>
  authApi({
    method: 'GET',
    url: `/Classes/${id}`
  })

export const updateClass = (data) => {
  return authApi({
    method: 'PUT',
    url: `Classes/${data.id}`,
    data
  })
}

export const createClass = (data) => {
  return authApi({
    method: 'POST',
    url: `Classes`,
    data
  })
}

export const deleteClass = (id) => {
  return authApi({
    method: `DELETE`,
    url: `Classes/${id}`,
  })
}
