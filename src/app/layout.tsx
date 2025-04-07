import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Taskora - Organize Your Tasks Effortlessly',
  description:
    'Taskora is a sleek and intuitive task manager. Create collections, manage tasks, and stay on top of what matters.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.variable} antialiased text-black bg-white dark:text-white dark:bg-[#121212]`}
      >
        {children}
      </body>
    </html>
  )
}
