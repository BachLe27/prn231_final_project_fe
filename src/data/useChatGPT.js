import { getClassById } from '@/api/classes/classes'
import { getChatGPTGrade } from '@/api/submission/submission'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useChatGPT = (request) => {
  const queryClient = useQueryClient()

  // const { isError, isLoading, data } = useQuery({
  //   queryKey: ['class'],
  //   queryFn: () => getChatGPTGrade(request),
  //   select: (data) => (data.data)
  // })

  const getChatGPTMutation = useMutation({
    mutationFn: async (data) => {
      return getChatGPTGrade(data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['classes']
      })
    },
    onError: (err) => {
      console.warn(err)
    }
  })

  return {
    // data,
    // isLoading,
    // isError,
    getChatGPTMutation
  }
}

export default useChatGPT
