import UserNavigation from '@/components/Layouts/UserNavigation'
import Head from 'next/head'

export default function UserLayout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Exmple app</title>
        <meta name="description" content="Example app" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        <UserNavigation/>

        {children}
      </div>
    </>
  )
}
