import { createSubject, deleteSubject, getSubjects, updateSubject } from '@/api/subjects/subjects'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useSubject = () => {
  const queryClient = useQueryClient()

  const { isError, isLoading, data } = useQuery({
    queryKey: ['subjects'],
    queryFn: () => getSubjects(),
    select: (data) => (data.data)
  })

  const updateSubjectMutation = useMutation({
    mutationFn: async (data) => {
      return updateSubject(data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['subjects']
      })
    },
    onError: (err) => {
      console.warn(err)
    }
  })

  const createSubjectMutation = useMutation({
    mutationFn: async (data) => {
      return createSubject(data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['subjects']
      })
    },
    onError: (err) => {
      console.warn(err)
    }
  })

  const deleteSubjectMutation = useMutation({
    mutationFn: async (id) => {
      console.log(id);
      return deleteSubject(id)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['subjects']
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
    updateSubjectMutation,
    createSubjectMutation,
    deleteSubjectMutation
  }
}

export default useSubject
