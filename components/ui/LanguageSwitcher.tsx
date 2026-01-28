'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type Locale = 'en' | 'es'

export default function LanguageSwitcher() {
  const params = useParams<{ locale: Locale }>()
  const pathname = usePathname()

  const [hash, setHash] = useState('')

  useEffect(() => {
    const update = () => setHash(window.location.hash || '')
    update()
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])

  const currentLocale: Locale = params?.locale === 'es' ? 'es' : 'en'
  const rest = pathname.replace(/^\/(en|es)(?=\/|$)/, '') || ''

  const hrefFor = (nextLocale: Locale) => `/${nextLocale}${rest}${hash}`

  const baseLink =
    'rounded-lg px-3 py-1 text-sm font-medium transition ' +
    'focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(0,0,0,0.12)]'

  return (
    <div
      className="flex items-center gap-1 rounded-xl border border-zinc-300 p-1 text-sm dark:border-zinc-700"
      aria-label="Language"
    >
      <Link
        href={hrefFor('es')}
        scroll={false}
        aria-current={currentLocale === 'es' ? 'true' : undefined}
        className={`${baseLink} ${
          currentLocale === 'es'
            ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]'
            : 'text-[rgb(var(--fg))] hover:bg-[rgb(var(--tint-1))]'
        }`}
      >
        ES
      </Link>

      <Link
        href={hrefFor('en')}
        scroll={false}
        aria-current={currentLocale === 'en' ? 'true' : undefined}
        className={`${baseLink} ${
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
