import { createContest, getContests, updateContest } from '@/api/contest/contest'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useContest = () => {
  const queryClient = useQueryClient()

  const { isError, isLoading, data } = useQuery({
    queryKey: ['Contests'],
    queryFn: () => getContests(),
    select: (data) => (data.data)
  })

  const updateContestMutation = useMutation({
    mutationFn: async (data) => {
      return updateContest(data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['Contests']
      })
    },
    onError: (err) => {
      console.warn(err)
    }
  })

  const createContestMutation = useMutation({
    mutationFn: async (data) => {
      return createContest(data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['contests']
      })
    },
    onError: (err) => {
      console.warn(err)
    }
  })

  // const deleteContestMutation = useMutation({
  //   mutationFn: async (id) => {
  //     console.log(id);
  //     return deleteContest(id)
  //   },
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries({
  //       queryKey: ['Contests']
  //     })
  //   },
  //   onError: (err) => {
  //     console.warn(err)
  //   }
  // })


  return {
    data,
    isLoading,
    isError,
    updateContestMutation,
    // deleteContestMutation
    createContestMutation,
  }
}

export default useContest
