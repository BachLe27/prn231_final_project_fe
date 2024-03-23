import { submitSolution } from '@/api/submission/submission'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useAddSubmission = (id) => {
  const queryClient = useQueryClient()

  const submitSolutionMutation = useMutation({
    mutationFn: async (data) => {
      return submitSolution(data)
    },
    onSuccess: async (data) => {
      await queryClient.refetchQueries({
        queryKey: ['submission', data.id],
      })
    },
    onError: (err) => {
      console.warn(err)
    }
  })

  return {
    submitSolutionMutation
  }
}

export default useAddSubmission
