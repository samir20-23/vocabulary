import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Enhanced Translation Dictionary',
  description: 'WordFlow - Your vocabulary learning app',
  icons: {
    icon: 'https://cdn-icons-png.flaticon.com/512/3898/3898082.png',
  },
}

// foat 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
