import ThemeToggle from '@/components/ThemeToggle'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl' // debug

// debug

export default function Page() {
  const t = useTranslations()
  const locale = useLocale() // debug

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      {/* 👇 DEBUG temporal */}
      <p className="mb-4 text-sm text-red-600">DEBUG locale: {locale}</p>
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="font-semibold">{t('hero.title')}</div>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>

      <section className="mt-14 rounded-3xl border border-zinc-200 bg-zinc-50 p-10 dark:border-zinc-800 dark:bg-zinc-900/40">
        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
          {t('hero.title')}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
          {t('hero.subtitle')}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            className="rounded-2xl bg-zinc-900 px-5 py-3 text-white hover:opacity-90 dark:bg-white dark:text-zinc-900"
            href="#"
          >
            {t('hero.ctaAmazon')}
          </a>
          <a
            className="rounded-2xl border border-zinc-300 px-5 py-3 hover:bg-white dark:border-zinc-700 dark:hover:bg-zinc-900"
            href="#"
          >
            {t('hero.ctaEtsy')}
          </a>
        </div>
      </section>
    </main>
  )
}
