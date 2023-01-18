import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import AuthLayout from '@/components/Layouts/AuthLayout'
import GuestLayout from '@/components/Layouts/GuestLayout'
import { useAuth } from '@/hooks/auth'
import Head from 'next/head'
import { useState } from 'react'

export default function ForgotPassword() {
  const { forgotPassword } = useAuth()

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  const submitForm = event => {
    event.preventDefault()

    forgotPassword({ email, setErrors, setStatus })
  }

  return (
    <>
      <Head>
        <title>Example app | Forgot password</title>
      </Head>

      {/* Logo */}
      <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />

      <AuthCard>
        <div className="mb-4 text-sm text-gray-600">
          Forgot your password? No problem. Just let us know your
          email address and we will email you a password reset link
          that will allow you to choose a new one.
        </div>

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
              name="email"
              value={email}
              className="block mt-1 w-full"
              onChange={event => setEmail(event.target.value)}
              required
              autoFocus
            />

            <InputError messages={errors.email} className="mt-2" />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Button>Email Password Reset Link</Button>
          </div>
        </form>
      </AuthCard>
    </>
  )
}

ForgotPassword.getLayout = function getLayout(page) {
  return (
    <GuestLayout>
      <AuthLayout>
        {page}
      </AuthLayout>
    </GuestLayout>
  )
}
