import axios from '@/lib/axios'
import { useRouter } from 'next/router'

export const useAuth = () => {
  const router = useRouter()

  const csrf = () => axios.get('/auth/csrf-cookie')

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
      .post('/auth/forgot-password', { email })
      .then(response => setStatus(response.data.message))
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const login = async ({ setErrors, setStatus, ...props }) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
      .post('/auth/login', props)
      .then(() => router.push('/user'))
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const logout = async () => {
    await axios
      .post('/auth/logout')
      .then(() => router.push('/guest'))
  }

  const register = async ({ setErrors, ...props }) => {
    await csrf()

    setErrors([])

    axios
      .post('/auth/register', props)
      .then(() => router.push('/auth/login'))
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const resendEmailVerification = ({ setStatus }) => {
    axios
      .post('/auth/email/verification-notification')
      .then((response) =>
        setStatus(response.data.status)
      )
  }

  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
      .post('/auth/reset-password', { token: router.query.token, ...props })
      .then(response =>
        router.push('/auth/login?reset=' + Buffer.from(response.data.message).toString('base64')),
      )
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  return {
    forgotPassword,
    login,
    logout,
    register,
    resendEmailVerification,
    resetPassword
  }
}
