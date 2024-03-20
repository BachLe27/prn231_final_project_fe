'use client'
import useAuth from '@/hook/useAuth'
import AuthenticationLayout from '@/layout/AuthenticationLayout'
import { redirect } from 'next/navigation'

const Auth = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return redirect('/')
  }

  return (
    <AuthenticationLayout>
      {children}
    </AuthenticationLayout>
  )
}

export default Auth
