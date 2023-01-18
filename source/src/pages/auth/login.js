import Button from '@/components/Button'
import Head from 'next/head'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AuthLayout from '@/components/Layouts/AuthLayout'
import AuthCard from '@/components/AuthCard'
import ApplicationLogo from '@/components/ApplicationLogo'
import GuestLayout from '@/components/Layouts/GuestLayout'

export default function Login() {
  const router = useRouter()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [shouldRemember, setShouldRemember] = useState(false)
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  const submitForm = async event => {
    event.preventDefault()

    login({
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    })
  }

  useEffect(() => {
    if (router.query.reset?.length > 0 && errors.length === 0) {
      setStatus(Buffer.from(router.query.reset, 'base64').toString('ascii'))
    } else {
      setStatus(null)
    }
  })

  return (
    <>
      <Head>
        <title>Example app | Login</title>
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
              autoComplete="current-password"
            />

            <InputError
              messages={errors.password}
              className="mt-2"
            />
          </div>

          {/* Remember Me */}
          <div className="block mt-4">
            <label
              htmlFor="remember_me"
              className="inline-flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                name="remember"
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={event =>
                  setShouldRemember(event.target.checked)
                }
              />

              <span className="ml-2 text-sm text-gray-600">
                Remember me
              </span>
            </label>
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link
              href="/auth/forgot-password"
              className="underline text-sm text-gray-600 hover:text-gray-900">
              Forgot your password?
            </Link>

            <Button className="ml-3">Login</Button>
          </div>
        </form>
      </AuthCard>

      <div className='mt-4 text-base text-gray-600'>
        Don't have an account?

        <Link
          href="/auth/register"
          className="ml-2 underline font-medium hover:text-gray-900">
          Join now!
        </Link>
      </div>
    </>
  )
}

Login.getLayout = function getLayout(page) {
  return (
    <GuestLayout>
      <AuthLayout>
        {page}
      </AuthLayout>
    </GuestLayout>
  )
}
