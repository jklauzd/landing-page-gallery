import { NextRequest, NextResponse } from 'next/server'

const SUBDOMAIN_ROUTES: Record<string, string> = {
  aura: '/aura',
  odontologia: '/odontologia',
  advocacia: '/advocacia',
  dashboard: '/dashboard',
  petluxe: '/petluxe',
}

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0] ?? ''
  const subdomain = host.split('.')[0]
  const pathname = request.nextUrl.pathname

  if (pathname !== '/' || !SUBDOMAIN_ROUTES[subdomain]) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = SUBDOMAIN_ROUTES[subdomain]
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/'],
}
