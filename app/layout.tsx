import { ThemeProvider } from '@/app/components/theme-provider'
import { Toaster } from '@/app/components/ui/toaster'
import { Nunito } from 'next/font/google'
import './globals.css'

import type { Metadata } from 'next'

const nunito = Nunito({ subsets: ['latin-ext'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={nunito.className}>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
