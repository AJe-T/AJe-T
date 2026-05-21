import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check for mock auth cookie
  const isAuthenticated = request.cookies.has('logisaas_auth')

  const isAuthPage = request.nextUrl.pathname === '/signin' || request.nextUrl.pathname === '/signup'

  if (!isAuthenticated && !isAuthPage) {
    // If not authenticated and trying to access a protected route, redirect to signin
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (isAuthenticated && isAuthPage) {
    // If authenticated and trying to access auth pages, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
