import authApi from '../config/authApi'
import publicApi from '../config/publicApi'

export const getSubjects = () =>
  publicApi({
    method: 'GET',
    url: '/Subjects'
  })

export const getSubjectById = (id) =>
  publicApi({
    method: 'GET',
    url: `/Subjects/${id}`
  })

export const updateSubject = (data) => {
  return authApi({
    method: 'PUT',
    url: `Subjects/${data.id}`,
    data
  })
}

export const createSubject = (data) => {
  return authApi({
    method: 'POST',
    url: `Subjects`,
    data
  })
}

export const deleteSubject = (id) => {
  return authApi({
    method: `DELETE`,
    url: `Subjects/${id}`,
  })
}

