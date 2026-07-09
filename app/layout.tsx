import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const sans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-zco-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ZCompany — Criamos páginas para o seu negócio vender',
  description:
    'Criamos a loja, a landing e o painel do seu negócio, e cuidamos de domínio, hospedagem e publicação. Orçamento via WhatsApp.',
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
      className={sans.variable}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
