import authApi from "../config/authApi"

export const createContest = (data) => {
  return authApi({
    method: 'POST',
    url: `Contests`,
    data
  })
}

export const updateContest = (data) => {
  return authApi({
    method: 'PUT',
    url: `Contests/${data.id}`,
    data
  })
}

export const getContests = (data) => {
  return authApi({
    method: 'GET',
    url: `Contests`,
    data
  })
}

export const getContestsById = (id) => {
  return authApi({
    method: 'GET',
    url: `Contests/${id}`,
  })
}