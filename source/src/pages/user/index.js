import Head from 'next/head'
import UserLayout from '@/components/Layouts/UserLayout'

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
    <UserLayout>
      {page}
    </UserLayout>
  )
}
