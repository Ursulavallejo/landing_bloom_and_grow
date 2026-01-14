import ThemeToggle from '@/components/ThemeToggle'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useTranslations } from 'next-intl'
import { playfair } from '@/app/fonts'

export default function Page() {
  const t = useTranslations()

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-[rgb(var(--tint-2))] ring-1 ring-[rgb(var(--border))] dark:bg-[rgb(var(--tint-1))]" />
          <div className="font-semibold text-[rgb(var(--fg))]">
            {t('hero.title')}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>

      <section className="mt-14 rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-10">
        <h1
          className={`${playfair.className}  leading-[1.1] text-3xl font-semibold text-[rgb(var(--fg))] md:text-6xl tracking-[-0.01em]`}
        >
          {t('hero.title')}
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-[rgb(var(--muted))]">
          {t('hero.subtitle')}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {/* Primary (Amazon) */}
          <a
            className="rounded-2xl bg-[rgb(var(--primary))] px-5 py-3 font-medium text-[rgb(var(--primary-foreground))] hover:opacity-90"
            href="#"
          >
            {t('hero.ctaAmazon')}
          </a>

          {/* Secondary (Etsy) */}
          <a
            className="rounded-2xl bg-[rgb(var(--accent))] px-5 py-3 font-medium text-[rgb(var(--accent-foreground))] hover:opacity-90"
            href="#"
          >
            {t('hero.ctaEtsy')}
          </a>
        </div>
      </section>
    </main>
  )
}
