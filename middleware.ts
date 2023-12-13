import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (req: NextRequest): NextResponse {
  const token = req.cookies.get('token')

  if (token == null) {
    const url = req.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*'
}
