import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AeroCast',
  description: 'Weather & Pm2.5 checking website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
