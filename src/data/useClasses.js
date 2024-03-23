import { updateProfile } from '@/api/account/profile'
import { createClass, deleteClass, getClasses, updateClass } from '@/api/classes/classes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useClasses = () => {
  const queryClient = useQueryClient()

  const { isError, isLoading, data } = useQuery({
    queryKey: ['classes'],
    queryFn: () => getClasses(),
    select: (data) => (data.data)
  })


  const updateClassMutation = useMutation({
    mutationFn: async (data) => {
      return updateClass(data)
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

  const updateClasses = useMutation({
    mutationFn: async (data) => {
      return updateProfile(data)
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

  const createClassMutation = useMutation({
    mutationFn: async (data) => {
      return createClass(data)
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

  const deleteClassMutation = useMutation({
    mutationFn: async (id) => {
      return deleteClass(id)
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
    data,
    isLoading,
    isError,
    updateClasses,
    createClassMutation,
    deleteClassMutation,
    updateClassMutation,
  }
}

export default useClasses
