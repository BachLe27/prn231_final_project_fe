import { getSubmissionsById, submitGradeSubmissionsById } from '@/api/submission/submission'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useSubmissionById = (id) => {
  const queryClient = useQueryClient()

  const { isError, isLoading, data, refetch } = useQuery({
    queryKey: ['submission', id],
    queryFn: () => getSubmissionsById(id),
    select: (data) => (data.data),
  })


  const updateSubmissionsMutation = useMutation({
    mutationFn: async (data) => {
      return submitGradeSubmissionsById(data)
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
    data,
    isLoading,
    isError,
    refetch,
    updateSubmissionsMutation
  }
}

export default useSubmissionById
