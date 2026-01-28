import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import BuyOptionsModal from './BuyOptionsModal'

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

export default function BookCard({ book }: { book: Book }) {
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
