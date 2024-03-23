import { getHistory } from '@/api/history/history'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const useHistory = (id) => {
  const queryClient = useQueryClient()

  const { isError, isLoading, data } = useQuery({
    queryKey: ['history', id],
    queryFn: () => getHistory(id),
    select: (data) => (data.data)
  })

  return {
    data,
    isLoading,
    isError,
  }
}

export default useHistory
