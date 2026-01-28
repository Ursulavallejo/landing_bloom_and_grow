'use client'

import { useTranslations } from 'next-intl'
import { Icons } from '@/icons'
import P5Background from '@/components/visuals/p5/P5BackgroundProject'
import { MotionFade } from '@/components/visuals/motion/MotionFade'
import SoftPinkWaveBottomProject from '@/components/visuals/decorations/SoftPinkWaveBottomProject'

export default function OurProjectSection() {
  const t = useTranslations()
  const GrowIcon = Icons.growIcon

  return (
    <>
      <section className="relative w-full">
        {/* Full-width pink background */}
        <div className="relative w-full bg-[var(--accent-foreground)] overflow-hidden">
          {/* p5 background: at the back card */}
          {/* Mobile: fewer + bigger */}
          <div className="sm:hidden">
            <P5Background
              className="z-0 [--p5-ink-rgb:255_255_255] w-full"
              opacity={0.92}
              motion={2.2}
              parallax={0.6}
              particleCount={70}
              glyphCount={14}
              bigGlyphCount={12}
              particleRadius={[2.2, 5.2]}
              glyphSize={[26, 44]}
              bigGlyphSize={[64, 112]}
            />
          </div>
          {/* Desktop/tablet */}
          <div className="hidden sm:block">
            <P5Background
              className="z-0 [--p5-ink-rgb:255_255_255] w-full"
              opacity={0.82}
              motion={1.8}
              parallax={1.2}
              particleCount={180}
              glyphCount={38}
              bigGlyphCount={6}
              particleRadius={[1.2, 3.4]}
              glyphSize={[16, 34]}
              bigGlyphSize={[54, 98]}
            />
          </div>
          <div className="relative z-10 mx-auto max-w-6xl px-(--page-pad) pt-16 sm:pt-20 pb-14 ">
            {/* Title */}
            <header className="text-center">
              <MotionFade
                as="h2"
                className="font-subtitle text-3xl tracking-wide text-[rgb(var(--fg))] sm:text-4xl md:text-5xl"
                direction="down"
                delay={0.3}
                duration={0.6}
              >
                {t('project.title')}
              </MotionFade>
              {/* small lead */}
              <MotionFade
                as="p"
                className="mx-auto mt-4 max-w-2xl font-subtitle tracking-wide font-medium text-base leading-relaxed text-[rgb(var(--fg))]/90 sm:text-lg"
                direction="up"
                delay={0.4}
                duration={0.6}
              >
                <span className="font-semibold">{t('project.lead')}</span>
              </MotionFade>
            </header>

            {/* Centered content (no animation) */}
            <MotionFade
              as="div"
              className="mt-10 flex justify-center"
              direction="up"
              delay={0.3}
              duration={0.6}
            >
              <article
                className="
                  w-full max-w-3xl
                  rounded-3xl border border-[rgb(var(--border))]
                  bg-[rgb(var(--card))]
                  p-6 shadow-sm sm:p-8 md:p-10
                "
              >
                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(var(--icon-badge-bg))]">
                    <GrowIcon className="h-9 w-9 text-[rgb(var(--icon-badge-fg))]" />
                  </div>
                </div>

                {/* Card title */}
                <h3 className="text-center font-nav text-lg font-semibold text-[rgb(var(--primary))] sm:text-xl">
                  {t('project.cardTitle')}
                </h3>

                {/* Text */}
                <div className="mt-4 space-y-4 font-nav text-sm leading-relaxed text-[rgb(var(--fg))]/85 sm:text-base text-justify">
                  <p>{t('project.p1')}</p>
                  <p>{t('project.p2')}</p>
                  <p>{t('project.p3')}</p>
                </div>

                {/* Notes */}
                <p className="mt-6 text-center text-xs leading-relaxed text-[rgb(var(--fg))]/60">
                  {t('project.pageNote1')}
                  <br />
                  {t('project.pageNote2')}
                </p>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <span className="rounded-full bg-(--tint-1) px-3 py-1 text-xs font-semibold text-(--accent-blue) backdrop-blur-sm">
                    {t('project.tag1')}
                  </span>
                  <span className="rounded-full bg-(--tint-1) px-3 py-1 text-xs font-semibold text-(--accent-blue) backdrop-blur-sm">
                    {t('project.tag2')}
                  </span>
                  <span className="rounded-full bg-(--tint-1) px-3 py-1 text-xs font-semibold text-(--accent-blue) backdrop-blur-sm">
                    {t('project.tag3')}
                  </span>
                </div>
              </article>
            </MotionFade>
          </div>
        </div>
      </section>

      <SoftPinkWaveBottomProject className="block w-full -mt-px" />
    </>
  )
}
