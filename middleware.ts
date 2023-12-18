import { getRoleFromToken } from './helpers/getRoleFromToken'
import { isTokenExpired } from './helpers/isTokenExpired'
import { refreshToken } from './api/user/auth'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function middleware (req: NextRequest) {
  const token = String(req.cookies.get('token'))
  const refreshTokenCookie = String(req.cookies.get('refreshToken'))
  const role = (token != null) ? getRoleFromToken(token) : null

  if (isTokenExpired(token) && refreshTokenCookie.length > 0) {
    try {
      const newToken = await refreshToken(refreshTokenCookie)
      if (newToken.length > 0) {
        const response = NextResponse.next()
        response.cookies.set('token', newToken, { httpOnly: true, sameSite: 'strict' })
        return response
      }
    } catch (error) {
      const url = req.nextUrl.clone()
      url.pathname = '/auth/login'
      return NextResponse.redirect(url.toString(), { status: 302 })
    }
  }

  if (role == null) {
    const url = req.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url.toString(), { status: 302 })
  }

  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (token.length === 0) {
      const url = req.nextUrl.clone()
      url.pathname = '/auth/login'
      return NextResponse.redirect(url.toString(), { status: 302 })
    }
  }

  if (role !== 'admin' && role !== 'teacher' && !req.nextUrl.pathname.startsWith('/dashboard/user')) {
    const url = req.nextUrl.clone()
    url.pathname = '/dashboard/guardian'
    return NextResponse.redirect(url.toString(), { status: 302 })
  }

  if (role === 'teacher' && !req.nextUrl.pathname.startsWith('/dashboard/teacher')) {
    const url = req.nextUrl.clone()
    url.pathname = '/dashboard/teacher'
    return NextResponse.redirect(url.toString(), { status: 302 })
  }

  if (role === 'admin' && !req.nextUrl.pathname.startsWith('/dashboard/admin')) {
    const url = req.nextUrl.clone()
    url.pathname = '/dashboard/admin'
    return NextResponse.redirect(url.toString(), { status: 302 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*'
}
