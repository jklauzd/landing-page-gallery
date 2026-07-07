import type { Metadata } from 'next'
import { Fraunces, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  axes: ['opsz', 'SOFT'],
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono-brand',
})

export const metadata: Metadata = {
  title: 'zcompany — estúdio de produtos digitais',
  description:
    'Criamos landing pages, e-commerce, dashboards e sistemas de login sob medida. Uma vitrine de interfaces vivas feitas pela zcompany.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      data-color-mode="dark"
      data-light-theme="light"
      data-dark-theme="dark"
      className={`${fraunces.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
