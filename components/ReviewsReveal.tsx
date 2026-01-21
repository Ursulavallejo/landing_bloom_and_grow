'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

type Review = { quote: string; author: string }

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, options)

    obs.observe(el)
    return () => obs.disconnect()
  }, [options])

  return { ref, inView }
}

export default function ReviewsReveal({
  className = '',
  titleClassName = '',
  quoteClassName = '',
}: {
  className?: string
  titleClassName?: string
  quoteClassName?: string
}) {
  const t = useTranslations('reviews')

  const reviews = useMemo<Review[]>(
    () => [
      { quote: t('items.0.quote'), author: t('items.0.author') },
      { quote: t('items.1.quote'), author: t('items.1.author') },
    ],
    [t],
  )

  const { ref: ref1, inView: inView1 } = useInView<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px',
  })

  const { ref: ref2, inView: inView2 } = useInView<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px',
  })

  // Parallax súper suave para el segundo (solo cuando ya está en view)
  const [y, setY] = useState(0)
  useEffect(() => {
    if (!inView2) return

    const onScroll = () => {
      const el = ref2.current
      if (!el) return
      const r = el.getBoundingClientRect()
      // rango pequeño para que sea sutil
      const offset = Math.max(
        -30,
        Math.min(30, (r.top - window.innerHeight * 0.5) * 0.08),
      )
      setY(offset)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [inView2, ref2])

  return (
    <section className={`relative w-full py-4 sm:py-5 ${className}`}>
      <div className="mx-auto max-w-5xl px-(--page-pad)">
        <h3
          className={`text-center font-subtitle text-4xl sm:text-5xl text-[rgb(var(--fg))] ${titleClassName}`}
        >
          {t('title')}
        </h3>

        {/* Review 1 */}
        <div
          ref={ref1}
          className={[
            'mx-auto mt-10 sm:mt-14 max-w-3xl text-center',
            'transition-all duration-700 ease-out',
            inView1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          ].join(' ')}
        >
          <QuoteBlock
            quote={reviews[0].quote}
            author={reviews[0].author}
            quoteClassName={quoteClassName}
          />
        </div>

        {/* Review 2 */}
        <div
          ref={ref2}
          style={{ transform: inView2 ? `translateY(${y}px)` : undefined }}
          className={[
            'mx-auto mt-12 sm:mt-16 max-w-3xl text-center',
            'transition-all duration-700 ease-out',
            inView2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ].join(' ')}
        >
          <QuoteBlock
            quote={reviews[1].quote}
            author={reviews[1].author}
            quoteClassName={quoteClassName}
          />
        </div>
      </div>
    </section>
  )
}

function QuoteBlock({
  quote,
  author,
  quoteClassName = '',
}: {
  quote: string
  author: string
  quoteClassName?: string
}) {
  return (
    <figure className="relative">
      {/* Comillas grandes decorativas */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 -top-6 select-none font-subtitle text-7xl leading-none text-[rgb(var(--fg))]/45 sm:-left-8 sm:-top-8 sm:text-8xl"
      >
        “
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -bottom-10 select-none font-subtitle text-7xl leading-none text-[rgb(var(--fg))]/45 sm:-right-8 sm:-bottom-12 sm:text-8xl"
      >
        ”
      </span>

      <blockquote
        className={`whitespace-pre-line font-nav text-base leading-relaxed text-[rgb(var(--fg))]/85 sm:text-lg ${quoteClassName}`}
      >
        {quote}
      </blockquote>

      <figcaption className="mt-4 font-nav text-sm font-semibold tracking-wide italic text-[rgb(var(--fg))]/70">
        — {author}
      </figcaption>
    </figure>
  )
}
