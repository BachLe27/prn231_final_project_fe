import authApi from "../config/authApi"

export const getHistory = (id) => {
  return authApi({
    method: `GET`,
    url: `History/${id}`,
  })
}