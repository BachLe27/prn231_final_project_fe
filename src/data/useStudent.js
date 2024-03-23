import { getStudents } from '@/api/students/student'
import { useQuery } from '@tanstack/react-query'

const useStudent = () => {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['students'],
    queryFn: () => getStudents(),
    select: (data) => (data.data)
  })

  return {
    data,
    isLoading,
    isError,
  }
}

export default useStudent
