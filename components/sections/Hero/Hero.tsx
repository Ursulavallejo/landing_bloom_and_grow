'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import BlobPill from '@/components/visuals/decorations/BlobPill'
import PinkBlobs from '@/components/visuals/decorations/PinkBlobs'
import PinkWave from '@/components/visuals/decorations/PinkWave'
import LogoStampImage from '@/components/visuals/images/LogoStampImage'
import { MotionFade } from '@/components/visuals/motion/MotionFade'

export default function Hero() {
  const t = useTranslations()
  const pill = t('hero.pill')

  const CTAButtons = (
    <>
      <a
        href="https://www.amazon.com/stores/author/B0GFPK6X39?ingress=0&visitId=e6ba4566-5cf5-42b9-9849-3bc9b868e152&ref_=aufs_ap_ahdr_dsk_aa"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Bloom & Grow Lab on Amazon (opens in a new tab)"
        className="rounded-xl bg-[var(--accent-foreground)] px-4 py-3 sm:px-5 font-nav text-sm font-semibold text-white whitespace-nowrap hover:opacity-90 hover:scale-105 transition"
      >
        {t('hero.ctaAmazon')}
      </a>

      <a
        href="https://www.etsy.com/shop/BloomAndGrowLab"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Bloom & Grow Lab on Etsy (opens in a new tab)"
        className="rounded-xl bg-[#35B26B] px-4 py-3 sm:px-5 font-nav text-sm font-semibold text-white whitespace-nowrap hover:opacity-90 hover:scale-105 transition"
      >
        {t('hero.ctaEtsy')}
      </a>
    </>
  )

  return (
    <div className="relative overflow-visible">
      <section className="relative flex-1 overflow-hidden rounded-3xl border border-[rgb(var(--border))]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT */}
          <div className="relative bg-[rgb(var(--card))] p-8 pb-10 tablet:pb-12 md:p-12 md:pb-12 md:pr-40">
            {/* Hero title */}
            <div className="mt-4 grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-3 md:flex md:gap-6">
              <MotionFade
                as="h1"
                className="font-hero text-5xl leading-[0.9] tracking-tight text-[#35B26B] md:text-7xl"
                direction="down"
                delay={0.2}
                duration={0.6}
              >
                BLOOM <br /> &amp; GROW
              </MotionFade>

              {/* pill */}
              <MotionFade
                as="div"
                className="uppercase tracking-wide justify-self-start sm:justify-self-end mt-6 sm:mt-2 md:mt-6 -translate-x-13 sm:translate-x-0 max-w-[240px] sm:max-w-none tablet:-translate-x-10"
                direction="up"
                duration={0.6}
                delay={0.4}
              >
                <BlobPill>
                  {pill.split('\n').map((line, i) => (
                    <span
                      key={i}
                      className="block whitespace-nowrap font-subtitle tracking-wide"
                    >
                      {line}
                    </span>
                  ))}
                </BlobPill>
              </MotionFade>
            </div>

            {/* Subtitle */}
            <MotionFade
              as="p"
              className="mt-6 max-w-full tablet:max-w-[410px] md:max-w-md font-nav text-base leading-relaxed text-[rgb(var(--fg))]"
              direction="down"
              delay={0.3}
            >
              {t('hero.subtitle')}
            </MotionFade>

            {/* CTA + Logo */}
            <div className="mt-6 md:mt-8">
              {/* Mobile: logo centered (decorative) */}
              <MotionFade
                as="div"
                aria-hidden="true"
                className="pointer-events-none flex justify-center tablet:hidden md:hidden"
                direction="up"
                delay={0.3}
                duration={0.6}
              >
                <div className="relative opacity-90 h-32 w-32 sm:h-34 sm:w-34">
                  <LogoStampImage />
                </div>
              </MotionFade>

              {/* Tablet: buttons left + logo right */}
              <div className="hidden tablet:flex md:hidden items-end justify-between gap-6">
                <MotionFade
                  as="div"
                  className="flex flex-nowrap justify-start gap-3 sm:gap-4"
                  direction="up"
                  delay={0.4}
                  duration={0.6}
                >
                  {CTAButtons}
                </MotionFade>

                <div
                  aria-hidden="true"
                  className="pointer-events-none shrink-0 opacity-90"
                >
                  <MotionFade
                    as="div"
                    className="relative h-28 w-28"
                    direction="up"
                    delay={0.3}
                    duration={0.6}
                  >
                    <LogoStampImage />
                  </MotionFade>
                </div>
              </div>

              {/* Desktop */}
              <MotionFade
                as="div"
                className="hidden md:flex flex-nowrap justify-start gap-3 sm:gap-4"
                direction="up"
                delay={0.4}
                duration={0.6}
              >
                {CTAButtons}
              </MotionFade>

              {/* Mobile buttons */}
              <MotionFade
                as="div"
                className="mt-6 flex flex-nowrap justify-center gap-3 sm:gap-4 tablet:hidden md:hidden"
                direction="up"
                delay={0.4}
                duration={0.6}
              >
                {CTAButtons}
              </MotionFade>
            </div>

            {/* Logo (absolute) — md+ decorative */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-6 right-6 hidden md:block"
            >
              <MotionFade
                as="div"
                className="relative h-32 w-32"
                direction="up"
                delay={0.3}
                duration={0.6}
              >
                <LogoStampImage />
              </MotionFade>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative bg-(--tint-1) w-full min-h-80 md:min-h-130 overflow-hidden">
            <MotionFade
              as="div"
              className="relative mx-auto h-95 w-full max-w-205 md:h-130"
              direction="up"
              delay={0.4}
              duration={0.6}
            >
              <Image
                src="/imagenHeroTransparent.png"
                alt={t('hero.imageAlt')}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </MotionFade>

            {/* decor */}
            <PinkBlobs />
          </div>
        </div>
      </section>

      <PinkWave />
    </div>
  )
}
