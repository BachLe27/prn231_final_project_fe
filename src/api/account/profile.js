import authApi from '../config/authApi'

export const updateProfile = (data) => {
  return authApi({
    method: 'PUT',
    url: `Users/${data.id}`,
    data
  })
}

export const getProfile = (id) => {
  return authApi({
    method: 'GET',
    url: `/Users/${id}`
  })
}
