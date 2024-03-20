import { getProfile, updateProfile } from '@/api/account/profile'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useProfile = (id) => {
  const queryClient = useQueryClient()

  const { isError, isLoading, data } = useQuery({
    queryKey: ['get-profile', id],
    queryFn: () => {
      return getProfile(id)
    },
    select: (data) => (data.data)
  })

  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      return updateProfile(data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get-profile', id]
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
    updateProfileMutation
  }
}

export default useProfile
