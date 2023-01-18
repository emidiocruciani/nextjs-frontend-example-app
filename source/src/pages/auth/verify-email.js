import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import AuthLayout from '@/components/Layouts/AuthLayout'
import UserLayout from '@/components/Layouts/UserLayout'
import { useAuth } from '@/hooks/auth'
import Head from 'next/head'
import { useState } from 'react'

export default function VerifyEmail() {
  const { logout, resendEmailVerification } = useAuth()

  const [status, setStatus] = useState(null)

  return (
    <>
      <Head>
        <title>Example app | Verify email</title>
      </Head>


      {/* Logo */}
      <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />

      <AuthCard>
        <div className="mb-4 text-sm text-gray-600">
          Thanks for signing up! Before getting started, could you
          verify your email address by clicking on the link we just
          emailed to you? If you didn't receive the email, we will
          gladly send you another.
        </div>

        {status === 'verification-link-sent' && (
          <div className="mb-4 font-medium text-sm text-green-600">
            A new verification link has been sent to the email
            address you provided during registration.
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <Button
            onClick={() => resendEmailVerification({ setStatus })}>
            Resend Verification Email
          </Button>

          <button
            type="button"
            className="underline text-sm text-gray-600 hover:text-gray-900"
            onClick={logout}>
            Logout
          </button>
        </div>
      </AuthCard>
    </>
  )
}

VerifyEmail.getLayout = function getLayout(page) {
  return (
    <UserLayout>
      <AuthLayout>
        {page}
      </AuthLayout>
    </UserLayout>
  )
}
