import type { Metadata } from 'next'
import Footer from '@/components/sections/Footer/Footer'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-32.png',
  },
  metadataBase: new URL('https://bloomandgrowlab.com'),
  title: {
    default: 'Bloom & Grow: The Emotion Lab',
    template: '%s | Bloom & Grow: The Emotion Lab',
  },
  description:
    'Children’s books and activities to explore emotions with calm, joy, and confidence. Stories, printables, and emotional learning for families.',
  applicationName: 'Bloom & Grow: The Emotion Lab',
  generator: 'Next.js',
  keywords: [
    // EN
    'children books about emotions',
    'emotional intelligence for kids',
    'social emotional learning',
    'bedtime stories',
    'mindfulness for kids',
    'feelings book for children',
    'Bloom and Grow',
    'Emotion Lab',

    // SV
    'barnböcker om känslor',
    'känslor för barn',
    'emotionell intelligens för barn',
    'social emotionell inlärning',
    'godnattsagor för barn',
    'mindfulness för barn',
    'bok om känslor för barn',

    // ES
    'libros infantiles sobre emociones',
    'inteligencia emocional para niños',
    'aprendizaje socioemocional',
    'cuentos para dormir',
    'mindfulness para niños',
    'libro sobre sentimientos para niños',
  ],
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      es: '/es',
      sv: '/sv',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://bloomandgrowlab.com',
    siteName: 'Bloom & Grow: The Emotion Lab',
    title: 'Bloom & Grow: The Emotion Lab',
    description:
      'Children’s books and activities to explore emotions with calm, joy, and confidence.',
    images: [
      {
        url: '/og/bloom-grow-og.png',
        width: 1200,
        height: 630,
        alt: 'Bloom & Grow: The Emotion Lab',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bloom & Grow: The Emotion Lab',
    description:
      'Children’s books and activities to explore emotions with calm, joy, and confidence.',
    images: ['/og/bloom-grow-og.png'],
  },

  manifest: '/manifest.webmanifest',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  // next-intl use this localeon server components
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
      <Footer />
    </NextIntlClientProvider>
  )
}
