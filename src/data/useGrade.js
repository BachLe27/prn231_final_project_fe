import { getSubmissionsById, submitGradeSubmissionsById } from '@/api/submission/submission'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useGrade = () => {
  const queryClient = useQueryClient()

  const updateSubmissionsMutation = useMutation({
    mutationFn: async (data) => {
      console.log(data);
      return submitGradeSubmissionsById(data)
    },

    onSuccess: async (data) => {
      await queryClient.refetchQueries({
        queryKey: ['submission', data.data.id],
      })
    },
    onError: (err) => {
      console.warn(err)
    }
  })

  return {
    updateSubmissionsMutation
  }
}

export default useGrade
