import { addStudentToClass, getStudentInClass } from "@/api/manageClass/manageClass"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const useStudentClass = (id) => {
  const queryClient = useQueryClient()

  const { isError, isLoading, data } = useQuery({
    queryKey: ['student-in-class', id],
    queryFn: () => getStudentInClass(id),
    select: (data) => (data.data)
  })

  const addStudentToClassMutation = useMutation({
    mutationFn: async (data) => {
      return addStudentToClass(data)
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
    isError,
    isLoading,
    data,
    addStudentToClassMutation
  }
}

export default useStudentClass