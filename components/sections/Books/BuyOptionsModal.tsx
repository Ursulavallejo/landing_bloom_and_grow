import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function BuyOptionsModal({
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
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile (Tailwind sm breakpoint: 640px)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  // Lock background scroll while modal is open (iOS-safe, restores scroll position on close)
  useEffect(() => {
    if (!open) return

    const scrollY = window.scrollY
    const original = {
      overflow: document.body.style.overflow,
      overscroll: document.body.style.overscrollBehavior,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    }

    document.body.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'none'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'

    return () => {
      document.body.style.overflow = original.overflow
      document.body.style.overscrollBehavior = original.overscroll
      document.body.style.position = original.position
      document.body.style.top = original.top
      document.body.style.width = original.width
      window.scrollTo(0, scrollY)
    }
  }, [open])

  const canUseDOM = typeof window !== 'undefined' && !!window.document?.body
  if (!open || !canUseDOM) return null

  return createPortal(
    <div className="fixed inset-0 z-[90]">
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/55"
        aria-label={t('close')}
      />

      {/* Positioning wrapper
          - Mobile: fullscreen (no topPx)
          - sm+: keep the near-button positioning using topPx
      */}
      <div
        className={[
          'absolute z-[91]',
          // Mobile fullscreen
          'inset-0',
          // Desktop: centered + width + translate
          'sm:inset-auto sm:left-1/2 sm:w-[min(92vw,780px)] sm:-translate-x-1/2',
        ].join(' ')}
        style={!isMobile ? { top: topPx } : undefined}
      >
        {/* Panel
            - Mobile: full height
            - sm+: max-height with internal scroll
        */}
        <div
          className={[
            'w-full bg-[rgb(var(--card))] border border-[rgb(var(--border))] shadow-2xl',
            // Mobile fullscreen
            'h-[100dvh] rounded-none',
            // Desktop
            'sm:h-auto sm:rounded-3xl sm:max-h-[calc(100vh-48px)]',
            // Critical: enable proper internal scrolling
            'flex flex-col min-h-0',
          ].join(' ')}
        >
          {/* Header (non-scroll area) */}
          <div className="p-5 sm:p-6">
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
          </div>

          {/* Scrollable content area */}
          <div className="px-5 pb-6 sm:px-6 overflow-y-auto overscroll-contain min-h-0 [-webkit-overflow-scrolling:touch]">
            <div className="mt-2 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-3">
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
