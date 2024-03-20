import publicApi from '../config/publicApi'

export const login = (data) =>
  publicApi({
    method: 'POST',
    url: 'auth/login',
    data
  })

export const register = (data) =>
  publicApi({
    method: 'POST',
    url: 'auth/register',
    data
  })
