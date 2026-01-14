'use client'

import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      themes={['light', 'dark']}
    >
      {children}
    </ThemeProvider>
  )
}
