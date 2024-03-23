import { getClassOfStudent } from "@/api/manageClass/manageClass"
import { useQuery } from "@tanstack/react-query"

const useClassOfStudent = (id) => {

  const { isError, isLoading, data } = useQuery({
    queryKey: ['class-of-student', id],
    queryFn: () => getClassOfStudent(id),
    select: (data) => (data.data)
  })

  return {
    data,
    isLoading,
    isError,
  }
}

export default useClassOfStudent