'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { MotionFade } from '@/components/visuals/motion/MotionFade'
import SoftYellowWaveTop from '@/components/visuals/decorations/SoftYellowWaveTop'
import SoftYellowWaveBottom from '@/components/visuals/decorations/SoftYellowWaveBottom'
import BookCard from './BookCard'

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
      {/* Wave TOP: yellow */}
      <SoftYellowWaveTop className="block w-full -mb-px" />

      {/* content */}
      <section className="relative w-full bg-(--tint-1) py-5 sm:py-10">
        <div className="relative mx-auto max-w-6xl px-(--page-pad)">
          <MotionFade
            as="h2"
            id="books-title"
            className="text-center font-subtitle text-5xl text-black sm:text-6xl"
            direction="down"
            delay={0.3}
            duration={0.6}
          >
            {t('title')}
          </MotionFade>
          <MotionFade
            as="p"
            className="mx-auto mt-4 max-w-2xl text-center font-nav text-sm text-black sm:text-base font-semibold"
            direction="up"
            delay={0.4}
            duration={0.6}
          >
            {t('subtitle')}
          </MotionFade>
          <MotionFade
            as="div"
            className={gridClassName}
            direction="up"
            delay={0.4}
            duration={0.6}
          >
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
          </MotionFade>
        </div>
      </section>

      {/* Wave BOTTOM: yellow */}
      <SoftYellowWaveBottom className="block w-full -mt-px" />
    </>
  )
}
