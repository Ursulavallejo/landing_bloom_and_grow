'use client'

import P5Background from '@/components/visuals/p5/P5BackgroundAbout'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function AboutSection() {
  const t = useTranslations('about')

  return (
    <section className="relative w-full py-16 sm:py-24">
      {/* P5 background */}
      <P5Background
        className="z-0 [--p5-ink-rgb:30_41_59] dark:[--p5-ink-rgb:255_255_255]"
        opacity={1.2}
      />

      <div className="relative mx-auto max-w-6xl px-(--page-pad)">
        {/* Title */}
        <h2
          id="about-title"
          className="mb-12 text-center font-subtitle text-5xl sm:text-6xl text-[rgb(var(--fg))]"
        >
          {t('title')}
        </h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Card 1 */}
          <AboutCard
            photo="/profileUrsulaAbout.png"
            name={t('person1.name')}
            role={t('person1.role')}
            text={t('person1.text')}
            imgClassName="scale-106 translate-y-2"
          />

          {/* Card 2 */}
          <AboutCard
            photo="/profileMargarita.png"
            name={t('person2.name')}
            role={t('person2.role')}
            text={t('person2.text')}
            imgClassName="scale-[1.10] translate-y-3"
          />
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------- */
/* Card component                               */
/* -------------------------------------------- */

function AboutCard({
  photo,
  name,
  role,
  text,
  imgClassName = '',
}: {
  photo: string
  name: string
  role: string
  text: string
  imgClassName?: string
}) {
  return (
    <article className="relative flex h-full flex-col items-center rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-8 text-center shadow-sm">
      <div className="mb-4 h-32 w-32 overflow-hidden rounded-full bg-(--tint-1)">
        <Image
          src={photo}
          alt={name}
          width={256}
          height={256}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      </div>

      <h3 className="mt-2 font-subtitle text-2xl text-[rgb(var(--fg))]">
        {name}
      </h3>
      <p className="mt-1 text-sm font-nav uppercase tracking-wide text-[rgb(var(--fg))]/60">
        {role}
      </p>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-[rgb(var(--fg))]/80 text-justify">
        {text}
      </p>
    </article>
  )
}
