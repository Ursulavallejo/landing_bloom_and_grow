'use client'

import LanguageSwitcher from '@/components/LanguageSwitcher'
import ThemeToggle from '@/components/ThemeToggle'
import { useTranslations } from 'next-intl'
import { Icons } from '@/icons'

export default function Header() {
  const t = useTranslations()
  const Ig = Icons.instagramIcon
  const Fb = Icons.facebookIcon

  return (
    <header className="fixed inset-x-0 top-0 z-50 font-ui">
      {/* Este container mantiene exactamente tu layout */}
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Left brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-2">
              <span className="font-brand text-xl md:text-2xl leading-none text-[rgb(var(--fg))]">
                {t('header.brand')}
              </span>
            </div>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-8 font-ui text-sm font-semibold text-[rgb(var(--fg))]">
            <a
              href="#about"
              className="transition hover:text-[rgb(var(--primary))]"
            >
              {t('nav.about')}
            </a>
            <a
              href="#books"
              className="transition hover:text-[rgb(var(--primary))]"
            >
              {t('nav.books')}
            </a>
            <a
              href="#contact"
              className="transition hover:text-[rgb(var(--primary))]"
            >
              {t('nav.contact')}
            </a>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button className="rounded-full bg-white/70 p-2 hover:bg-white">
              <Ig className="h-5 w-5" />
            </button>
            <button className="rounded-full bg-white/70 p-2 hover:bg-white">
              <Fb className="h-5 w-5" />
            </button>

            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
