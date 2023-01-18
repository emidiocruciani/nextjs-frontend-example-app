import GuestLayout from '@/components/Layouts/GuestLayout'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Example app | Welcome</title>
      </Head>

    </>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <GuestLayout>
      {page}
    </GuestLayout>
  )
}
