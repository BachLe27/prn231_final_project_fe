
import { getContestsById } from '@/api/contest/contest'
import { getSubmissionsByContest } from '@/api/submission/submission'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useSubmissionsByContest = (id) => {
  const queryClient = useQueryClient()

  const { isError, isLoading, data } = useQuery({
    queryKey: ['submissions-by-contest', id],
    queryFn: () => getSubmissionsByContest(id),
    select: (data) => (data.data)
  })

  const submitSolutionMutation = useMutation({
    mutationFn: async (data) => {
      return submitSolutionMutation(data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['submissions-by-contest', id],
      })
    },
    onError: (err) => {
      console.warn(err)
    }
  })

  return {
    data,
    isLoading,
    isError,
  }
}

export default useSubmissionsByContest
