import { getClassById } from '@/api/classes/classes'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const useClassById = (id) => {
  const queryClient = useQueryClient()

  const { isError, isLoading, data } = useQuery({
    queryKey: ['class', id],
    queryFn: () => getClassById(id),
    select: (data) => (data.data)
  })

  return {
    data,
    isLoading,
    isError,
  }
}

export default useClassById
