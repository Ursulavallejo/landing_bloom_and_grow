'use client'

import { useTranslations } from 'next-intl'

import { MotionFade } from '@/components/visuals/motion/MotionFade'
import AboutCard from './AboutCard'

export default function AboutSection() {
  const t = useTranslations('about')

  return (
    <section className="relative w-full py-16 sm:py-24">
      <div className="relative mx-auto max-w-6xl px-(--page-pad)">
        {/* Title */}
        <MotionFade
          as="h2"
          id="about-title"
          className="mb-12 text-center font-subtitle text-5xl sm:text-6xl text-[rgb(var(--fg))]"
          direction="down"
          delay={0.3}
          duration={0.6}
        >
          {t('title')}
        </MotionFade>

        {/* Cards grid */}
        <MotionFade
          as="div"
          className="grid grid-cols-1 gap-8 sm:grid-cols-2"
          direction="up"
          delay={0.2}
          duration={0.6}
        >
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
        </MotionFade>
      </div>
    </section>
  )
}
