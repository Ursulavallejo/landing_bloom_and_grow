'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'

import Navbar from '@/components/layout/Navbar'
import { SocialLinks } from '@/components/layout/SocialLinks'
import HeaderControls from '@/components/layout/HeaderControls'

export default function Header() {
  const t = useTranslations()
  const { resolvedTheme } = useTheme()

  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  const openBtnRef = useRef<HTMLButtonElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  // prevent focusing the hamburger on initial mount (only restore focus after closing)
  const wasOpenRef = useRef(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'
  const closeMenu = () => setMenuOpen(false)

  // Track scroll for glass background
  useEffect(() => {
    const sentinel = document.getElementById('scroll-sentinel')
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { root: null, threshold: 0, rootMargin: '-1px 0px 0px 0px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  // Lock body scroll when menu is open + close on ESC
  useEffect(() => {
    if (!menuOpen) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  // Move focus into the dialog when opened; restore focus ONLY after it was opened
  useEffect(() => {
    if (menuOpen) {
      wasOpenRef.current = true
      requestAnimationFrame(() => closeBtnRef.current?.focus())
      return
    }

    if (wasOpenRef.current) {
      requestAnimationFrame(() => openBtnRef.current?.focus())
      wasOpenRef.current = false
    }
  }, [menuOpen])

  const noFocusRing =
    'outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none'

  return (
    <header className="fixed inset-x-0 top-0 z-50 font-ui">
      {/* Glass background */}
      <div
        aria-hidden="true"
        className={[
          'pointer-events-none absolute inset-0 transition-all duration-300',
          scrolled
            ? isDark
              ? 'backdrop-blur-xl backdrop-saturate-200 bg-zinc-950/30 border-b border-white/10'
              : 'backdrop-blur-xl backdrop-saturate-200 bg-white/30 border-b border-black/5'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-4">
        {/* MOBILE */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <a
              href="#top"
              onClick={closeMenu}
              className="font-brand font-semibold text-xl tracking-wide leading-none text-[rgb(var(--fg))] hover:text-[rgb(var(--primary))] transition"
            >
              {t('header.brand')}
            </a>

            <div className="flex items-center gap-2">
              <HeaderControls />

              <button
                ref={openBtnRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className={[
                  'inline-flex items-center justify-center p-2 text-[rgb(var(--fg))] hover:text-[rgb(var(--primary))] transition',
                  noFocusRing,
                  menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100',
                ].join(' ')}
              >
                <span className="text-3xl leading-none">≡</span>
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center justify-between gap-6">
          <a
            href="#top"
            className="font-brand text-2xl leading-none text-[rgb(var(--fg))] hover:text-[rgb(var(--primary))] transition"
          >
            {t('header.brand')}
          </a>

          <Navbar variant="desktop" />

          <div className="flex items-center gap-2">
            <SocialLinks />
            <HeaderControls />
          </div>
        </div>
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          className="md:hidden fixed inset-0 z-[60]"
        >
          <h2 id="mobile-menu-title" className="sr-only">
            {t('nav.ariaLabel')}
          </h2>

          {/* Backdrop / click-to-close */}
          <div
            aria-hidden="true"
            onClick={closeMenu}
            className={[
              'absolute inset-0 backdrop-blur-2xl transition-colors duration-300',
              !mounted
                ? 'bg-white/30'
                : isDark
                  ? 'bg-zinc-950/60'
                  : 'bg-white/30',
            ].join(' ')}
          />

          <div className="relative w-full px-6 pt-12 tablet:pt-24 pb-10">
            <button
              ref={closeBtnRef}
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className={[
                'absolute top-6 right-6 text-4xl leading-none text-[rgb(var(--fg))] transition hover:text-[rgb(var(--primary))] hover:scale-125',
                noFocusRing,
              ].join(' ')}
            >
              ×
            </button>

            <Navbar variant="mobile" onNavigate={closeMenu} />

            <div className="mt-12">
              <SocialLinks size="lg" />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
