/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

export default authMiddleware({
  // afterAuth (auth, req, evt) {
  //   // handle users who aren't authenticated
  //   if (!auth.userId && !auth.isPublicRoute) {
  //     return redirectToSignIn({ returnBackUrl: req.url })
  //   }
  //   // redirect them to organization selection page
  //   if (auth.userId && !auth.orgId && req.nextUrl.pathname !== '/org-selection') {
  //     const orSelection = new URL('/org-selection', req.url)
  //     return NextResponse.redirect(orSelection)
  //   }
  // },

  publicRoutes: ['/']
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
