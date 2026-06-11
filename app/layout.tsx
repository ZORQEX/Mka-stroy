import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-family',
})

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.variable} suppressHydrationWarning>
      <body className="relative min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
