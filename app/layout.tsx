import './globals.css'
import Providers from '@/components/Providers'
import { barrio, caveat, quicksand } from './fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${barrio.variable} ${caveat.variable} ${quicksand.variable}`}
    >
      <body className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
