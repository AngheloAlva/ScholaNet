import { getRoleFromToken } from './helpers/getRoleFromToken'
import { isTokenExpired } from './helpers/isTokenExpired'
import { refreshToken } from './api/user/auth'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function middleware (req: NextRequest) {
  const tokenCookie = req.cookies.get('token')
  const refreshTokenCookie = req.cookies.get('refreshToken')

  const token = (tokenCookie != null) ? tokenCookie.value : ''
  const refreshTokenValue = (refreshTokenCookie != null) ? refreshTokenCookie.value : ''

  if ((token.length === 0) || isTokenExpired(token)) {
    if (refreshTokenValue.length === 0) {
      try {
        const newToken = await refreshToken(refreshTokenValue)
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
    } else {
      const url = req.nextUrl.clone()
      url.pathname = '/auth/login'
      return NextResponse.redirect(url.toString(), { status: 302 })
    }
  }

  const role = getRoleFromToken(token)

  if (role != null) {
    const basePath = `/dashboard/${role}`
    if (!req.nextUrl.pathname.startsWith(basePath)) {
      const url = req.nextUrl.clone()
      url.pathname = basePath
      return NextResponse.redirect(url.toString(), { status: 302 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*'
}
