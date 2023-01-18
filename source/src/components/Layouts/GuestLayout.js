import Head from 'next/head'
import GuestNavigation from './GuestNavigation'

export default function GuestLayout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Exmple app</title>
        <meta name="description" content="Example app" />
      </Head>

      <div className="flex flex-col min-h-screen bg-gray-100">
        <GuestNavigation/>

        {children}
      </div>
    </>
  )
}
