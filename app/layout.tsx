import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mkastroy.com'),
  title: 'MKA STROY — Инженерно-строительная компания',
  description:
    'Инженерно-строительная компания с международным опытом. Проектирование и монтаж инженерных систем для промышленных объектов, аэропортов и жилых комплексов.',
  applicationName: 'MKA STROY',
  formatDetection: { telephone: true },
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#e85d04',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={inter.variable} suppressHydrationWarning>
      <body className="relative min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
