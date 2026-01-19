'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import ThemeToggle from '@/components/ThemeToggle'
import { useTranslations } from 'next-intl'
import { Icons } from '@/icons'

export default function Header() {
  const t = useTranslations()
  const Ig = Icons.instagramIcon
  const Fb = Icons.facebookIcon
  const { resolvedTheme } = useTheme()

  // Track whether the page has been scrolled
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll() // set initial state
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isDark = resolvedTheme === 'dark'

  return (
    <header className="fixed inset-x-0 top-0 z-50 font-ui">
      {/* Backdrop layer: transparent at top, blurred + tinted when scrolled */}
      <div
        aria-hidden="true"
        className={[
          'pointer-events-none absolute inset-0 z-0 transition-all duration-300',
          scrolled
            ? isDark
              ? 'backdrop-blur-xl backdrop-saturate-200 bg-zinc-950/30 border-b border-white/10'
              : 'backdrop-blur-xl backdrop-saturate-200 bg-white/30 border-b border-black/5'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      />

      {/* Container */}
      <div className="relative mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Left brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-2">
              <a
                href="#top"
                className="font-brand text-xl md:text-2xl leading-none text-[rgb(var(--fg))] hover:text-[rgb(var(--primary))] transition"
              >
                {t('header.brand')}
              </a>
            </div>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[rgb(var(--fg))]">
            <a
              href="#project"
              className="transition hover:text-[rgb(var(--primary))] hover:scale-110"
            >
              {t('nav.project')}
            </a>
            <a
              href="#about"
              className="transition hover:text-[rgb(var(--primary))] hover:scale-110"
            >
              {t('nav.about')}
            </a>
            <a
              href="#books"
              className="transition hover:text-[rgb(var(--primary))] hover:scale-110"
            >
              {t('nav.books')}
            </a>

            <a
              href="#contact"
              className="transition hover:text-[rgb(var(--primary))] hover:scale-110"
            >
              {t('nav.contact')}
            </a>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <a
              href="https://instagram.com/..."
              aria-label="Instagram"
              className="
                inline-flex items-center justify-center p-2
                text-[rgb(var(--fg))]
                transition-transform duration-200 ease-out
                hover:text-[rgb(var(--primary))] hover:scale-125
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))]
                focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--hero-bg))]
              "
            >
              <Ig className="h-5 w-5" />
            </a>

            <a
              href="https://facebook.com/..."
              aria-label="Facebook"
              className="
                inline-flex items-center justify-center p-2
                text-[rgb(var(--fg))]
                transition-transform duration-200 ease-out
                hover:text-[rgb(var(--primary))] hover:scale-125
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))]
                focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--hero-bg))]
              "
            >
              <Fb className="h-5 w-5" />
            </a>

            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
