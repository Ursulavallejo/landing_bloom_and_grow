'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

type Lang = 'es' | 'en' | 'sv'
type FormatKey = 'kindle' | 'paperback' | 'etsy'

type Book = {
  id: string
  defaultLang: Lang
  coverByLang: Record<Lang, string> // mockup image per language
  titles: Record<Lang, string>
  short: Record<Lang, string>
  formats: { key: FormatKey; label: string }[]
  buyLinksByLang: Record<
    Lang,
    {
      amazonKindle?: string
      amazonPaperback?: string
      etsyDigital?: string
    }
  >
}

export default function BooksSection() {
  const t = useTranslations('books')

  const books = useMemo<Book[]>(
    () => [
      {
        id: 'time-to-dream',
        defaultLang: 'es',
        coverByLang: {
          es: '/mockupES.png',
          en: '/mockupEN.png',
          sv: '/mockupSV.png',
        },
        titles: {
          es: t('items.0.titles.es'),
          en: t('items.0.titles.en'),
          sv: t('items.0.titles.sv'),
        },
        short: {
          es: t('items.0.short.es'),
          en: t('items.0.short.en'),
          sv: t('items.0.short.sv'),
        },
        formats: [
          { key: 'kindle', label: t('formats.kindle') },
          { key: 'paperback', label: t('formats.paperback') },
          { key: 'etsy', label: t('formats.etsy') },
        ],
        buyLinksByLang: {
          es: {
            amazonKindle: t('items.0.links.es.amazonKindle'),
            amazonPaperback: t('items.0.links.es.amazonPaperback'),
            etsyDigital: t('items.0.links.es.etsyDigital'),
          },
          en: {
            amazonKindle: t('items.0.links.en.amazonKindle'),
            amazonPaperback: t('items.0.links.en.amazonPaperback'),
            etsyDigital: t('items.0.links.en.etsyDigital'),
          },
          sv: {
            amazonKindle: t('items.0.links.sv.amazonKindle'),
            amazonPaperback: t('items.0.links.sv.amazonPaperback'),
            etsyDigital: t('items.0.links.sv.etsyDigital'),
          },
        },
      },
    ],
    [t],
  )
  const gridClassName =
    books.length === 1
      ? 'mt-10 sm:mt-14 grid grid-cols-1 place-items-center'
      : books.length === 2
        ? 'mt-10 sm:mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:justify-items-center lg:grid-cols-2'
        : 'mt-10 sm:mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section className="relative w-full py-16 sm:py-24">
      <div className="absolute inset-0 -z-10 bg-[#ffd400]" />

      <div className="pointer-events-none absolute left-0 right-0 top-0 h-10 bg-[rgb(var(--bg))] [clip-path:ellipse(75%_100%_at_50%_0%)] opacity-80" />
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-12 bg-[rgb(var(--bg))] [clip-path:ellipse(75%_100%_at_50%_100%)] opacity-80" />

      <div className="relative mx-auto max-w-6xl px-(--page-pad)">
        <h2
          id="books-title"
          className="text-center font-subtitle text-5xl sm:text-6xl text-[rgb(var(--fg))]"
        >
          {t('title')}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center font-nav text-sm sm:text-base text-[rgb(var(--fg))]/70">
          {t('subtitle')}
        </p>

        {/* ✅ Grid responsive + centrado automático */}
        <div className={gridClassName}>
          {books.map((b) => (
            <div
              key={b.id}
              className={
                books.length === 1
                  ? 'w-full max-w-md' // 👈 limita el ancho para que no se vea gigante
                  : 'w-full'
              }
            >
              <BookCard book={b} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------- */
/* BookCard                                     */
/* -------------------------------------------- */

function BookCard({ book }: { book: Book }) {
  const t = useTranslations('books')
  const [lang, setLang] = useState<Lang>(book.defaultLang)
  const [open, setOpen] = useState(false)

  const links = book.buyLinksByLang[lang]

  return (
    <>
      <article
        className="
          rounded-3xl border border-[rgb(var(--border))]
          bg-[rgb(var(--card))] p-6 sm:p-7
          shadow-sm
        "
      >
        {/* Cover / mock */}
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={book.coverByLang[lang]}
            alt={book.titles[lang]}
            width={900}
            height={900}
            className="h-auto w-full object-cover"
            priority={false}
          />
        </div>

        {/* Language switch */}
        <div className="mt-5 flex items-center justify-center gap-2">
          <LangChip active={lang === 'es'} onClick={() => setLang('es')}>
            ES
          </LangChip>
          <LangChip active={lang === 'en'} onClick={() => setLang('en')}>
            EN
          </LangChip>
          <LangChip active={lang === 'sv'} onClick={() => setLang('sv')}>
            SV
          </LangChip>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-center font-subtitle text-2xl text-[rgb(var(--fg))]">
          {book.titles[lang]}
        </h3>

        {/* Short */}
        <p className="mx-auto mt-2 max-w-sm text-center font-nav text-sm leading-relaxed text-[rgb(var(--fg))]/75">
          {book.short[lang]}
        </p>

        {/* Format chips (always visible) */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {book.formats.map((f) => (
            <span
              key={f.key}
              className="
                rounded-full border border-[rgb(var(--border))]
                bg-[rgb(var(--bg))]/40 px-3 py-1
                font-nav text-[11px] uppercase tracking-wide
                text-[rgb(var(--fg))]/70
              "
            >
              {f.label}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="
              rounded-full px-5 py-2
              font-nav text-sm
              bg-[rgb(var(--accent))] text-[rgb(var(--accent-contrast,255_255_255))]
              hover:opacity-90 transition
            "
          >
            {t('cta')}
          </button>
        </div>

        {/* Tiny reassurance */}
        <p className="mt-3 text-center font-nav text-xs text-[rgb(var(--fg))]/60">
          {t('hint')}
        </p>
      </article>

      <BuyOptionsModal
        open={open}
        onClose={() => setOpen(false)}
        title={book.titles[lang]}
        langLabel={lang.toUpperCase()}
        links={links}
      />
    </>
  )
}

function LangChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-full px-3 py-1 font-nav text-xs transition',
        active
          ? 'bg-[rgb(var(--fg))] text-[rgb(var(--bg))]'
          : 'border border-[rgb(var(--border))] text-[rgb(var(--fg))]/70 hover:bg-[rgb(var(--bg))]/40',
      ].join(' ')}
      aria-pressed={active}
    >
      {children}
    </button>
  )
}

/* -------------------------------------------- */
/* Modal                                        */
/* -------------------------------------------- */

function BuyOptionsModal({
  open,
  onClose,
  title,
  langLabel,
  links,
}: {
  open: boolean
  onClose: () => void
  title: string
  langLabel: string
  links: {
    amazonKindle?: string
    amazonPaperback?: string
    etsyDigital?: string
  }
}) {
  const t = useTranslations('books')

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80]">
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
        aria-label={t('close')}
      />

      {/* Dialog */}
      <div className="relative mx-auto mt-20 w-[min(92vw,720px)]">
        <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 sm:p-8 shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-nav text-xs uppercase tracking-wide text-[rgb(var(--fg))]/60">
                {t('modal.kicker')} · {langLabel}
              </p>
              <h4 className="mt-1 font-subtitle text-2xl text-[rgb(var(--fg))]">
                {title}
              </h4>
              <p className="mt-2 font-nav text-sm text-[rgb(var(--fg))]/70">
                {t('modal.subtitle')}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[rgb(var(--border))] px-3 py-1 font-nav text-sm text-[rgb(var(--fg))]/80 hover:bg-[rgb(var(--bg))]/40"
            >
              {t('close')}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <BuyOption
              title={t('modal.options.kindle.title')}
              desc={t('modal.options.kindle.desc')}
              href={links.amazonKindle}
              cta={t('modal.open')}
            />
            <BuyOption
              title={t('modal.options.paperback.title')}
              desc={t('modal.options.paperback.desc')}
              href={links.amazonPaperback}
              cta={t('modal.open')}
            />
            <BuyOption
              title={t('modal.options.etsy.title')}
              desc={t('modal.options.etsy.desc')}
              href={links.etsyDigital}
              cta={t('modal.open')}
            />
          </div>

          <p className="mt-5 font-nav text-xs text-[rgb(var(--fg))]/55">
            {t('modal.footnote')}
          </p>
        </div>
      </div>
    </div>
  )
}

function BuyOption({
  title,
  desc,
  href,
  cta,
}: {
  title: string
  desc: string
  href?: string
  cta: string
}) {
  const disabled = !href

  return (
    <div
      className={[
        'rounded-2xl border border-[rgb(var(--border))] p-4',
        disabled ? 'opacity-50' : 'hover:bg-[rgb(var(--bg))]/30 transition',
      ].join(' ')}
    >
      <p className="font-nav text-xs uppercase tracking-wide text-[rgb(var(--fg))]/60">
        {title}
      </p>
      <p className="mt-2 font-nav text-sm leading-relaxed text-[rgb(var(--fg))]/75">
        {desc}
      </p>

      <div className="mt-4">
        <a
          href={href || '#'}
          target="_blank"
          rel="noreferrer"
          aria-disabled={disabled}
          onClick={(e) => {
            if (disabled) e.preventDefault()
          }}
          className={[
            'inline-flex items-center justify-center rounded-full px-4 py-2 font-nav text-sm',
            disabled
              ? 'border border-[rgb(var(--border))] text-[rgb(var(--fg))]/60'
              : 'bg-[rgb(var(--fg))] text-[rgb(var(--bg))] hover:opacity-90 transition',
          ].join(' ')}
        >
          {cta}
        </a>
      </div>
    </div>
  )
}
