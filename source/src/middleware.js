import { NextResponse } from 'next/server'

export async function middleware(request) {
  const authStatus = (
    await fetch(`${process.env.INTERNAL_BACKEND_URL}/api/user`,
      {
        headers: {
          'accept': 'application/json',
          'cookie': request.headers.get('cookie'),
          'referer': `${process.env.NEXT_PUBLIC_URL}`,
        }
      })
  ).status

  if (![200, 401, 409].includes(authStatus)) {
    throw new Error(`Unexpected status ${authStatus} from server authentication response`)
  }

  if (request.nextUrl.pathname.startsWith('/user')) {
    if (authStatus === 401) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    } else if (authStatus === 409) {
      return NextResponse.redirect(new URL('/auth/verify-email', request.url))
    }

  } else if (request.nextUrl.pathname.startsWith('/guest')) {
    if (authStatus === 200) {
      return NextResponse.redirect(new URL('/user', request.url))
    } else if (authStatus === 409) {
      return NextResponse.redirect(new URL('/auth/verify-email', request.url))
    }

  } else if (request.nextUrl.pathname.startsWith('/auth/verify-email')) {
    if (authStatus === 200) {
      return NextResponse.redirect(new URL('/user', request.url))
    } else if (authStatus === 401) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

  } else if (request.nextUrl.pathname.startsWith('/auth')) {
    if (authStatus === 200) {
      return NextResponse.redirect(new URL('/user', request.url))
    } else if (authStatus === 409) {
      return NextResponse.redirect(new URL('/auth/verify-email', request.url))
    }

  } else if (request.nextUrl.pathname == '/') {
    if (authStatus === 200) {
      return NextResponse.redirect(new URL('/user', request.url))
    } else if (authStatus === 401) {
      return NextResponse.redirect(new URL('/guest', request.url))
    } else if (authStatus === 409) {
      return NextResponse.redirect(new URL('/auth/verify-email', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|favicon.ico).*)',
  ],
}
