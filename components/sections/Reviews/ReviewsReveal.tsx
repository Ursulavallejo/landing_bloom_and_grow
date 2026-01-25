'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

type Review = { quote: string; author: string }

const STAGE_VH = 115
const SPEED = 1.8

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}
function invlerp(a: number, b: number, v: number) {
  return (v - a) / (b - a)
}
function clamp01(n: number) {
  return Math.max(0, Math.min(1, n))
}
function easeInOut(n: number) {
  return n * n * (3 - 2 * n)
}
function ramp(v: number, start: number, end: number) {
  return easeInOut(clamp01(invlerp(start, end, v)))
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

  const stageRef = useRef<HTMLDivElement | null>(null)
  const [progress, setProgress] = useState(0)

  // ✅ progreso 0..1 reversible basado en posición dentro del viewport
  useEffect(() => {
    let raf = 0

    const tick = () => {
      const el = stageRef.current
      if (el) {
        const r = el.getBoundingClientRect()
        const centerY = window.innerHeight * 0.55

        const total = r.height || 1
        const traveled = centerY - r.top
        const p = clamp((traveled / total) * SPEED, 0, 1)

        setProgress(p)
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // ✅ timing para que el Review 2 llegue a 100% antes
  const OUT_START = 0.1
  const OUT_END = 0.45
  const IN_START = 0.42
  const IN_END = 0.82

  const o1 = 1 - ramp(progress, OUT_START, OUT_END)
  const o2 = ramp(progress, IN_START, IN_END)

  const y2 = (o2 - 0.5) * 14
  useEffect(() => {
    console.log('progress', progress)
  }, [progress])

  return (
    <section className={`relative w-full py-2 sm:py-4 ${className}`}>
      <div className="mx-auto max-w-5xl px-(--page-pad)">
        {/* Mobile/Tablet title */}
        <h3
          id="reviews-title"
          className={`text-center font-subtitle text-4xl sm:text-5xl text-[rgb(var(--fg))] lg:hidden ${titleClassName}`}
        >
          {t('title')}
        </h3>

        {/* Desktop sticky reveal */}
        <div className="mt-10 hidden lg:block">
          <div className="relative" style={{ height: `${STAGE_VH}vh` }}>
            {/* stage con altura real */}
            <div
              ref={stageRef}
              className="absolute left-0 right-0 top-0"
              style={{ height: `${STAGE_VH}vh` }}
            />

            <div className="sticky top-20 z-10">
              {/* ✅ más aire entre título y review */}
              <div className="mb-10 sm:mb-12 text-center">
                <h3
                  className={`font-subtitle text-4xl sm:text-5xl text-[rgb(var(--fg))] ${titleClassName}`}
                >
                  {t('title')}
                </h3>
              </div>

              <div className="relative mx-auto max-w-3xl text-center">
                {/* Review 1 */}
                <div
                  className="absolute inset-0"
                  style={{
                    opacity: o1,
                    transform: `translateY(${(1 - o1) * 10}px)`,
                    transition:
                      'opacity 220ms ease-out, transform 220ms ease-out',
                    pointerEvents: o1 > 0.02 ? 'auto' : 'none',
                  }}
                >
                  <QuoteBlock
                    quote={reviews[0].quote}
                    author={reviews[0].author}
                    quoteClassName={quoteClassName}
                  />
                </div>

                {/* Review 2 */}
                <div
                  className="absolute inset-0"
                  style={{
                    opacity: o2,
                    transform: `translateY(${(-8 + y2).toFixed(2)}px)`,
                    transition:
                      'opacity 220ms ease-out, transform 220ms ease-out',
                    pointerEvents: o2 > 0.02 ? 'auto' : 'none',
                  }}
                >
                  <QuoteBlock
                    quote={reviews[1].quote}
                    author={reviews[1].author}
                    quoteClassName={quoteClassName}
                  />
                </div>

                {/* Spacer invisible para mantener altura */}
                <div className="invisible pointer-events-none pb-16">
                  <QuoteBlock
                    quote={reviews[1].quote}
                    author={reviews[1].author}
                    quoteClassName={quoteClassName}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: stack */}
        <div className="lg:hidden">
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <QuoteBlock
              quote={reviews[0].quote}
              author={reviews[0].author}
              quoteClassName={quoteClassName}
            />
          </div>

          <div className="mx-auto mt-12 max-w-3xl text-center pb-8">
            <QuoteBlock
              quote={reviews[1].quote}
              author={reviews[1].author}
              quoteClassName={quoteClassName}
            />
          </div>
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
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 -top-6 select-none font-subtitle text-7xl leading-none text-[rgb(var(--fg))]/60 sm:-left-8 sm:-top-8 sm:text-8xl"
      >
        “
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -bottom-10 select-none font-subtitle text-7xl leading-none text-[rgb(var(--fg))]/60 sm:-right-8 sm:-bottom-12 sm:text-8xl"
      >
        ”
      </span>

      <blockquote
        className={`whitespace-pre-line font-nav italic text-base leading-relaxed text-[rgb(var(--fg))]/95 sm:text-lg ${quoteClassName}`}
      >
        {quote}
      </blockquote>

      <figcaption className="mt-4 font-nav text-sm font-bold tracking-wide text-[rgb(var(--fg))]/90">
        — {author}
      </figcaption>
    </figure>
  )
}
