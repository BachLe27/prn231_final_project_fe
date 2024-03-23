import { getSubmissionByStudentAndContest, getSubmissionsById, submitGradeSubmissionsById } from '@/api/submission/submission'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useGetSubmission = (request) => {
  const { isError, isLoading, data, refetch } = useQuery({
    queryKey: ['submission-by-student-contest', request],
    queryFn: () => getSubmissionByStudentAndContest(request),
    select: (data) => (data.data),
  })

  return {
    data,
    isLoading,
    isError,
    refetch
  }
}

export default useGetSubmission
