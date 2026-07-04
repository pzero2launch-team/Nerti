import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nerti — Financial Intelligence',
  description: 'See what your money is doing before it moves.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
