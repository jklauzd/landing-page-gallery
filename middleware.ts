import { NextRequest, NextResponse } from 'next/server'

const SUBDOMAIN_SITES: Record<string, string> = {
  aura: 'aura',
  odontologia: 'odontologia',
  advocacia: 'advocacia',
  dashboard: 'dashboard',
  petluxe: 'petluxe',
}

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0] ?? ''
  const subdomain = host.split('.')[0]
  const { pathname } = request.nextUrl

  if (!SUBDOMAIN_SITES[subdomain] || pathname.startsWith('/_next')) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = pathname === '/'
    ? `/sites/${SUBDOMAIN_SITES[subdomain]}/index.html`
    : `/sites/${SUBDOMAIN_SITES[subdomain]}${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!api|favicon.ico).*)'],
}
