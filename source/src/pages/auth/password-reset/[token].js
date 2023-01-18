import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AuthLayout from '@/components/Layouts/AuthLayout'
import Head from 'next/head'
import AuthCard from '@/components/AuthCard'
import GuestLayout from '@/components/Layouts/GuestLayout'
import ApplicationLogo from '@/components/ApplicationLogo'

export default function PasswordReset() {
  const router = useRouter()

  const { resetPassword } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  const submitForm = event => {
    event.preventDefault()

    resetPassword({
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
      setStatus,
    })
  }

  useEffect(() => {
    setEmail(router.query.email || '')
  }, [router.query.email])

  return (
    <>
      <Head>
        <title>Example app | Password reset</title>
      </Head>

      {/* Logo */}
      <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />

      <AuthCard>
        {/* Session Status */}
        {status && (
          <div
            className={"mb-4 font-medium text-sm text-green-600"}>
            {status}
          </div>
        )}

        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              value={email}
              className="block mt-1 w-full"
              onChange={event => setEmail(event.target.value)}
              required
              autoFocus
            />

            <InputError messages={errors.email} className="mt-2" />
          </div>

          {/* Password */}
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              className="block mt-1 w-full"
              onChange={event => setPassword(event.target.value)}
              required
            />

            <InputError
              messages={errors.password}
              className="mt-2"
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-4">
            <Label htmlFor="passwordConfirmation">
              Confirm Password
            </Label>

            <Input
              id="passwordConfirmation"
              type="password"
              value={passwordConfirmation}
              className="block mt-1 w-full"
              onChange={event =>
                setPasswordConfirmation(event.target.value)
              }
              required
            />

            <InputError
              messages={errors.password_confirmation}
              className="mt-2"
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Button>Reset Password</Button>
          </div>
        </form>
      </AuthCard>
    </>
  )
}

PasswordReset.getLayout = function getLayout(page) {
  return (
    <GuestLayout>
      <AuthLayout>
        {page}
      </AuthLayout>
    </GuestLayout>
  )
}
