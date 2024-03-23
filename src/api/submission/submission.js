import authApi from "../config/authApi"

export const getSubmissionsByContest = (id) => {
  return authApi({
    method: 'GET',
    url: `/Submissions/getSubmissionsByContestId/${id}`,
  })
}

export const getSubmissionsById = (id) => {
  return authApi({
    method: 'GET',
    url: `/Submissions/${id}`,
  })
}

export const submitGradeSubmissionsById = (data) => {
  return authApi({
    method: 'PUT',
    url: `/Submissions/${data.id}`,
    data
  })
}

export const getSubmissionByStudentAndContest = (data) => {
  return authApi({
    method: 'GET',
    url: `/Submissions/${data.studentId}/${data.contestId}`,
  })
}


export const submitSolution = (data) => {
  return authApi({
    method: 'POST',
    url: `/Submissions`,
    data
  })
}



export const getChatGPTGrade = (data) => {
  return authApi({
    method: 'POST',
    url: `/GPT/generate/answer`,
    data
  })
}