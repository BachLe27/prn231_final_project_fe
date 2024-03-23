import authApi from "../config/authApi"

export const addStudentToClass = (data) => {
  return authApi({
    method: `POST`,
    url: `ManageClass`,
    data
  })
}

export const getStudentInClass = (id) => {
  return authApi({
    method: `GET`,
    url: `ManageClass?classId=${id}`,
  })
}

export const getClassOfStudent = (id) => {
  return authApi({
    method: `GET`,
    url: `ManageClass/GetStudentClass?studentId=${id}`,
  })
}