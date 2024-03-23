
import { getContestsById } from '@/api/contest/contest'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const useContestById = (id) => {
  const queryClient = useQueryClient()

  const { isError, isLoading, data } = useQuery({
    queryKey: ['contest', id],
    queryFn: () => getContestsById(id),
    select: (data) => (data.data)
  })

  return {
    data,
    isLoading,
    isError,
  }
}

export default useContestById
