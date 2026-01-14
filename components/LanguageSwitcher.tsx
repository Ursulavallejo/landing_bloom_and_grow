'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

type Locale = 'en' | 'es'

export default function LanguageSwitcher() {
  const params = useParams<{ locale: Locale }>()
  const pathname = usePathname()

  const currentLocale: Locale = params?.locale === 'es' ? 'es' : 'en'

  const rest = pathname.replace(/^\/(en|es)(?=\/|$)/, '') || ''

  const hrefFor = (nextLocale: Locale) => `/${nextLocale}${rest || ''}`

  return (
    <div className="flex items-center gap-1 rounded-xl border border-zinc-300 p-1 text-sm dark:border-zinc-700">
      <Link
        href={hrefFor('es')}
        className={`
    rounded-lg px-3 py-1 text-sm font-medium transition
    ${
      currentLocale === 'es'
        ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]'
        : 'text-[rgb(var(--fg))] hover:bg-[rgb(var(--tint-1))]'
    }
  `}
      >
        ES
      </Link>

      <Link
        href={hrefFor('en')}
        className={`rounded-lg px-2 py-1 ${
          currentLocale === 'en'
            ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]'
            : 'text-[rgb(var(--fg))] hover:bg-[rgb(var(--tint-1))]'
        }`}
      >
        EN
      </Link>
    </div>
  )
}
