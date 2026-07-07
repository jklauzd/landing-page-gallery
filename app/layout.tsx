import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/providers'

export const metadata: Metadata = {
  title: 'ZCompany — Digital Atelier',
  description:
    'A gallery of living landing pages. Scroll through complete, interactive cases crafted by the ZCompany studio.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-color-mode="dark"
      data-light-theme="light"
      data-dark-theme="dark"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
