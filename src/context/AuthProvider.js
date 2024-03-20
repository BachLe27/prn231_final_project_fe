'use client'
import { login as loginApi } from '@/api/auth/login'
import { useRouter } from 'next/navigation'
import { createContext, useCallback, useMemo, useState } from 'react'

export const AuthContext = createContext({
  isAuthenticated: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  me: null
})

const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null)
  const [me, setMe] = useState(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null)

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    setIsAuthenticated(null)
    router.push('/login')
  }, [])

  const login = useCallback(
    async (data, onSuccess, onError) => {
      try {
        const response = await loginApi(data)
        const { token, user } = response.data
        if (token && user) {
          localStorage.setItem('accessToken', token)
          localStorage.setItem('user', JSON.stringify(user))

          setIsAuthenticated(true)
          setMe(user)
        }
        onSuccess?.()
      } catch (error) {
        if (onError) onError?.(error)
      }
    },
    []
  )

  const contextValue = useMemo(() => {
    return {
      isAuthenticated,
      login,
      logout,
      me
    }
  }, [isAuthenticated, login, me])

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
