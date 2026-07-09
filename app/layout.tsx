import type { Metadata } from 'next'
import { DM_Sans, Instrument_Serif } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-zco-display',
  display: 'swap',
})

const sans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-zco-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ZCompany — Páginas que vendem',
  description:
    'Landing pages, lojas e dashboards com visual premium. Domínio, hospedagem e publicação inclusos. Orçamento via WhatsApp.',
  icons: {
    icon: '/favicon.svg',
  },
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
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
