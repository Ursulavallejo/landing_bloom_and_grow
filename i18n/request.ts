import { getRequestConfig } from 'next-intl/server'

const locales = ['en', 'es'] as const
type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : 'en'

  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default,
  }
})
