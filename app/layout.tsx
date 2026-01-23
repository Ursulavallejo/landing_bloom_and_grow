import './globals.css'
import Providers from '@/components/layout/Providers'
import { ThemeColorMeta } from '@/app/themeColorMeta'
import { barrio, caveat, quicksand, elite } from './fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${barrio.variable} ${caveat.variable} ${elite.variable} ${quicksand.variable}`}
    >
      <body className="min-h-screen">
        <Providers>
          <ThemeColorMeta />
          {children}
        </Providers>
      </body>
    </html>
  )
}
