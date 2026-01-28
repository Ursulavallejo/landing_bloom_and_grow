'use client'

import { useTranslations } from 'next-intl'

type Props = {
  variant: 'desktop' | 'mobile'
  onNavigate?: () => void
}

export default function Navbar({ variant, onNavigate }: Props) {
  const t = useTranslations()

  const linkClass =
    variant === 'desktop'
      ? 'hover:text-[rgb(var(--primary))] transition hover:scale-110'
      : 'block'

  const navClass =
    variant === 'desktop'
      ? 'flex items-center gap-8 text-sm font-semibold text-[rgb(var(--fg))]'
      : 'space-y-6 text-3xl font-semibold text-[rgb(var(--fg))]'

  return (
    <nav aria-label={t('nav.ariaLabel')} className={navClass}>
      <a
        href="#project"
        data-section="project"
        onClick={onNavigate}
        className={linkClass}
      >
        {t('nav.project')}
      </a>
      <a
        href="#about"
        data-section="about"
        onClick={onNavigate}
        className={linkClass}
      >
        {t('nav.about')}
      </a>
      <a
        href="#books"
        data-section="books"
        onClick={onNavigate}
        className={linkClass}
      >
        {t('nav.books')}
      </a>
      <a
        href="#contact"
        data-section="contact"
        onClick={onNavigate}
        className={linkClass}
      >
        {t('nav.contact')}
      </a>
    </nav>
  )
}
