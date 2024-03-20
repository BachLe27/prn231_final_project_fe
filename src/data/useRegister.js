import { register } from '@/api/auth/login'
import { useMutation } from '@tanstack/react-query'

const useRegister = () => {
  const registerMutation = useMutation({
    mutationFn: async (data) => {
      return register(data)
    },
    onError: (err) => {
      console.warn(err)
    }
  })

  return {
    registerMutation
  }
}

export default useRegister
