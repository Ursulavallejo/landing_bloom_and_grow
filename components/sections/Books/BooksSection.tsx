'use client'

import { useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { createPortal } from 'react-dom'

type Lang = 'es' | 'en' | 'sv'
type FormatKey = 'kindle' | 'paperback' | 'etsy'

type Book = {
  id: string
  defaultLang: Lang
  coverByLang: Record<Lang, string>
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
        : 'mt-10 sm:mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'

  return (
    <>
      {/* Wave TOP: yellow*/}
      <SoftYellowWaveTop className="block w-full -mb-px" />

      {/* content */}
      <section className="relative w-full bg-(--tint-1) py-5 sm:py-10">
        <div className="relative mx-auto max-w-6xl px-(--page-pad)">
          <h2
            id="books-title"
            className="text-center font-subtitle text-5xl text-[rgb(var(--fg))] sm:text-6xl"
          >
            {t('title')}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-center font-nav text-sm text-[rgb(var(--fg))]/70 sm:text-base font-semibold">
            {t('subtitle')}
          </p>

          <div className={gridClassName}>
            {books.map((b) => (
              <div
                key={b.id}
                className={[
                  'w-full',
                  'max-w-[520px] sm:max-w-[520px] lg:max-w-[360px] xl:max-w-[320px]',
                ].join(' ')}
              >
                <BookCard book={b} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave BOTTOM: yellow*/}
      <SoftYellowWaveBottom className="block w-full -mt-px" />
    </>
  )
}

/* -------------------------------------------- */
/* Waves       */
/* -------------------------------------------- */

function SoftYellowWaveTop({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none ${className} h-14 sm:h-16 `}
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
    >
      <path
        fill="var(--tint-1)"
        d="
          M0,0
          C120,20 240,40 360,36
          C480,32 600,10 720,14
          C840,18 960,48 1080,46
          C1200,44 1320,24 1440,16
          L1440,160 L0,160 Z
        "
      />
    </svg>
  )
}

function SoftYellowWaveBottom({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none ${className} h-14 sm:h-16 -scale-y-100`}
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
    >
      <path
        fill="var(--tint-1)"
        d="
          M0,0
          C120,20 240,40 360,36
          C480,32 600,10 720,14
          C840,18 960,48 1080,46
          C1200,44 1320,24 1440,16
          L1440,160 L0,160 Z
        "
      />
    </svg>
  )
}

/* -------------------------------------------- */
/* BookCard   */
/* -------------------------------------------- */

function BookCard({ book }: { book: Book }) {
  const t = useTranslations('books')
  const [lang, setLang] = useState<Lang>(book.defaultLang)
  const [open, setOpen] = useState(false)
  const [modalTop, setModalTop] = useState<number>(140)
  const buyBtnRef = useRef<HTMLButtonElement | null>(null)

  const links = book.buyLinksByLang[lang]

  function openModalNearButton() {
    const btn = buyBtnRef.current
    if (!btn) {
      setModalTop(140)
      setOpen(true)
      return
    }

    const rect = btn.getBoundingClientRect()
    const ESTIMATED_MODAL_H = 460
    const MARGIN = 24
    const desiredTop = rect.top + rect.height / 2 - ESTIMATED_MODAL_H / 2

    const minTop = MARGIN
    const maxTop = Math.max(
      MARGIN,
      window.innerHeight - MARGIN - ESTIMATED_MODAL_H,
    )

    setModalTop(Math.max(minTop, Math.min(desiredTop, maxTop)))
    setOpen(true)
  }

  return (
    <>
      <article className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm sm:p-7">
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

        <h3 className="mt-4 text-center font-subtitle text-2xl text-[rgb(var(--fg))]">
          {book.titles[lang]}
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-center font-nav text-sm leading-relaxed text-[rgb(var(--fg))]/75">
          {book.short[lang]}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {book.formats.map((f) => (
            <span
              key={f.key}
              className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--primary))] px-3 py-1 font-nav text-[11px] uppercase tracking-wide text-[rgb(var(--bg))]"
            >
              {f.label}
            </span>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            ref={buyBtnRef}
            type="button"
            onClick={openModalNearButton}
            className="rounded-full px-5 py-2 font-nav text-sm bg-[var(--accent-foreground)] text-[rgb(var(--accent-contrast,255_255_255))] transition hover:opacity-60 hover:scale-105"
          >
            {t('cta')}
          </button>
        </div>

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
        topPx={modalTop}
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

/* Modal  */
function BuyOptionsModal({
  open,
  onClose,
  title,
  langLabel,
  links,
  topPx,
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
  topPx: number
}) {
  const t = useTranslations('books')
  const canUseDOM = typeof window !== 'undefined' && !!window.document?.body
  if (!open || !canUseDOM) return null

  return createPortal(
    <div className="fixed inset-0 z-[90]">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/55"
        aria-label={t('close')}
      />
      <div
        className="absolute left-1/2 w-[min(92vw,780px)] -translate-x-1/2"
        style={{ top: topPx }}
      >
        <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 shadow-2xl sm:p-6 max-h-[calc(100vh-48px)] overflow-y-auto">
          {/* content modal */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-nav text-xs uppercase tracking-wide text-[rgb(var(--fg))]/60">
                {t('modal.kicker')} · {langLabel}
              </p>
              <h4 className="mt-1 font-subtitle text-xl text-[rgb(var(--fg))] sm:text-2xl">
                {title}
              </h4>
              <p className="mt-2 font-nav text-sm text-[rgb(var(--fg))]/70">
                {t('modal.subtitle')}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[rgb(var(--border))] px-3 py-1 font-nav text-sm text-[rgb(var(--fg))]/80 hover:bg-[rgb(var(--bg))]/40 transition hover:opacity-70 hover:scale-105"
            >
              {t('close')}
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-3">
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

          <p className="mt-4 font-nav text-xs text-[rgb(var(--fg))]/55">
            {t('modal.footnote')}
          </p>
        </div>
      </div>
    </div>,
    document.body,
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
        'flex h-full flex-col',
        disabled ? 'opacity-50' : 'hover:bg-[rgb(var(--bg))]/30 transition',
      ].join(' ')}
    >
      <p className="font-nav text-xs uppercase tracking-wide text-[rgb(var(--fg))]/60">
        {title}
      </p>
      <p className="mt-2 font-nav text-sm leading-relaxed text-[rgb(var(--fg))]/75">
        {desc}
      </p>

      <div className="mt-auto pt-4">
        <a
          href={href || '#'}
          target="_blank"
          rel="noreferrer"
          aria-disabled={disabled}
          onClick={(e) => {
            if (disabled) e.preventDefault()
          }}
          className={[
            'inline-flex items-center justify-center rounded-full px-4 py-2 font-nav text-sm transition hover:opacity-60 hover:scale-105',
            disabled
              ? 'border border-[rgb(var(--border))] text-[rgb(var(--fg))]/60'
              : 'bg-[rgb(var(--fg))] text-[rgb(var(--bg))] hover:opacity-90',
          ].join(' ')}
        >
          {cta}
        </a>
      </div>
    </div>
  )
}
