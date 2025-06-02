import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Logs | Howly',
  description: 'Sistemas de logs do servidor Howly.',
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
